package com.example.recipes.web;

import com.example.recipes.domain.Recipe;
import com.example.recipes.service.RecipeService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getRecipes(
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "limit", defaultValue = "10") int limit
    ) {
        Page<Recipe> result = recipeService.getAllSortedByRating(page, limit);
        Map<String, Object> body = new HashMap<>();
        body.put("page", page);
        body.put("limit", limit);
        body.put("total", result.getTotalElements());
        body.put("data", result.getContent());
        return ResponseEntity.ok(body);
    }

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchRecipes(
            @RequestParam(required = false) String calories,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String cuisine,
            @RequestParam(name = "total_time", required = false) String totalTime,
            @RequestParam(required = false) String rating
    ) {
        List<Recipe> recipes = recipeService.searchRecipes(calories, title, cuisine, totalTime, rating);
        return ResponseEntity.ok(Map.of("data", recipes));
    }
}

