package com.example.recipes.bootstrap;

import com.example.recipes.domain.Recipe;
import com.example.recipes.repository.RecipeRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Component
public class JsonDataLoader implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(JsonDataLoader.class);

    private final ObjectMapper objectMapper;
    private final RecipeRepository recipeRepository;

    @Value("${app.data.init:false}")
    private boolean init;

    @Value("${app.data.file:classpath:data/US_recipes.json}")
    private Resource dataFile;

    public JsonDataLoader(ObjectMapper objectMapper, RecipeRepository recipeRepository) {
        this.objectMapper = objectMapper;
        this.recipeRepository = recipeRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (!init) {
            return;
        }
        if (!dataFile.exists()) {
            log.warn("Data file not found: {}", dataFile);
            return;
        }
        if (recipeRepository.count() > 0) {
            log.info("Recipes already present, skipping import");
            return;
        }
        try (InputStream is = dataFile.getInputStream()) {
            JsonNode root = objectMapper.readTree(is);
            List<Recipe> toSave = new ArrayList<>();
            if (root.isArray()) {
                for (JsonNode node : root) {
                    toSave.add(mapNodeToRecipe(node));
                }
            } else {
                Iterator<JsonNode> elements = root.elements();
                while (elements.hasNext()) {
                    toSave.add(mapNodeToRecipe(elements.next()));
                }
            }
            recipeRepository.saveAll(toSave);
            log.info("Imported {} recipes", toSave.size());
        }
    }

    private Recipe mapNodeToRecipe(JsonNode node) {
        String cuisine = getText(node, "cuisine");
        String title = getText(node, "title");
        Double rating = getDoubleOrNull(node.get("rating"));
        Integer prepTime = getIntOrNull(node.get("prep_time"));
        Integer cookTime = getIntOrNull(node.get("cook_time"));
        Integer totalTime = getIntOrNull(node.get("total_time"));
        String description = getText(node, "description");

        JsonNode nutrientsNode = node.get("nutrients");
        String nutrients = null;
        Integer calories = null;
        if (nutrientsNode != null && !nutrientsNode.isNull()) {
            try {
                nutrients = objectMapper.writeValueAsString(nutrientsNode);
                JsonNode calNode = nutrientsNode.get("calories");
                if (calNode != null && !calNode.isNull()) {
                    Double cal = getDoubleOrNull(calNode);
                    calories = cal == null ? null : (int) Math.round(cal);
                }
            } catch (Exception e) {
                // keep null nutrients on error
            }
        }
        String serves = getText(node, "serves");

        return Recipe.builder()
                .cuisine(cuisine)
                .title(title)
                .rating(rating)
                .prepTime(prepTime)
                .cookTime(cookTime)
                .totalTime(totalTime)
                .description(description)
                .nutrients(nutrients)
                .calories(calories)
                .serves(serves)
                .build();
    }

    private String getText(JsonNode node, String field) {
        JsonNode v = node.get(field);
        if (v == null || v.isNull()) return null;
        String text = v.asText();
        if ("NaN".equalsIgnoreCase(text)) return null;
        return text;
    }

    private Double getDoubleOrNull(JsonNode v) {
        if (v == null || v.isNull()) return null;
        if (v.isTextual() && "NaN".equalsIgnoreCase(v.asText())) return null;
        try {
            if (v.isNumber()) return v.asDouble();
            String s = v.asText();
            if (s == null || s.isBlank()) return null;
            double d = Double.parseDouble(s);
            if (Double.isNaN(d)) return null;
            return d;
        } catch (Exception e) {
            return null;
        }
    }

    private Integer getIntOrNull(JsonNode v) {
        Double d = getDoubleOrNull(v);
        return d == null ? null : (int) Math.round(d);
    }
}

