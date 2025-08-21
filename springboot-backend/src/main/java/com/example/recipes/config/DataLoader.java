package com.example.recipes.config;

import com.example.recipes.model.Recipe;
import com.example.recipes.repo.RecipeRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.Map;

@Component
public class DataLoader implements ApplicationRunner {

    private final RecipeRepository repository;
    private final ObjectMapper mapper = new ObjectMapper();

    public DataLoader(RecipeRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (repository.count() > 0) return;

        // Priority: external path via --data=<path>, else classpath sample JSON
        String jsonPath = getArg(args, "data");
        if (jsonPath != null) {
            File f = new File(jsonPath);
            if (f.exists()) {
                importFromFile(f);
                return;
            }
        }
        var sample = new ClassPathResource("sample_recipes.json");
        if (sample.exists()) {
            importFromFile(sample.getFile());
        }
    }

    private void importFromFile(File file) throws IOException {
        byte[] bytes = Files.readAllBytes(file.toPath());
        // JSON can be an array or an object keyed by ids
        try {
            List<Map<String, Object>> list = mapper.readValue(bytes, new TypeReference<>() {});
            list.forEach(this::saveRecipe);
        } catch (Exception e) {
            Map<String, Map<String, Object>> map = mapper.readValue(bytes, new TypeReference<>() {});
            map.values().forEach(this::saveRecipe);
        }
    }

    private void saveRecipe(Map<String, Object> r) {
        Recipe recipe = new Recipe();
        recipe.setCuisine(stringOrNull(r.get("cuisine")));
        recipe.setTitle(stringOrNull(r.get("title")));
        recipe.setRating(numberOrNull(r.get("rating")));
        recipe.setPrepTime(intOrNull(r.get("prep_time")));
        recipe.setCookTime(intOrNull(r.get("cook_time")));
        recipe.setTotalTime(intOrNull(r.get("total_time")));
        recipe.setDescription(stringOrNull(r.get("description")));
        Object nutrients = r.get("nutrients");
        if (nutrients != null) {
            try { recipe.setNutrientsJson(mapper.writeValueAsString(nutrients)); } catch (Exception ignored) {}
            Double calories = null;
            if (nutrients instanceof Map<?,?> m) {
                calories = numberOrNull(m.get("calories"));
            }
            recipe.setCalories(calories);
        }
        recipe.setServes(stringOrNull(r.get("serves")));
        repository.save(recipe);
    }

    private String getArg(ApplicationArguments args, String name) {
        if (args.containsOption(name)) {
            return args.getOptionValues(name).stream().findFirst().orElse(null);
        }
        return null;
    }

    private String stringOrNull(Object v) { return v == null ? null : String.valueOf(v); }
    private Double numberOrNull(Object v) {
        if (v == null) return null;
        try { double d = Double.parseDouble(String.valueOf(v)); return Double.isNaN(d) ? null : d; }
        catch (Exception e) { return null; }
    }
    private Integer intOrNull(Object v) {
        if (v == null) return null;
        try { int d = (int) Math.round(Double.parseDouble(String.valueOf(v))); return d; }
        catch (Exception e) { return null; }
    }
}

