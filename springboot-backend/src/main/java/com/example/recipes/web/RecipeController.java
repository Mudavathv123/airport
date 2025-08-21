package com.example.recipes.web;

import com.example.recipes.model.Recipe;
import com.example.recipes.service.RecipeService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class RecipeController {

    private final RecipeService service;

    public RecipeController(RecipeService service) {
        this.service = service;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "ok");
    }

    @GetMapping("/recipes")
    public Map<String, Object> getRecipes(@RequestParam(defaultValue = "1") int page,
                                          @RequestParam(defaultValue = "10") int limit) {
        Page<Recipe> p = service.getAll(page, limit);
        Map<String, Object> body = new HashMap<>();
        body.put("page", page);
        body.put("limit", limit);
        body.put("total", p.getTotalElements());
        body.put("data", p.getContent());
        return body;
    }

    @GetMapping("/recipes/search")
    public ResponseEntity<Map<String, List<Recipe>>> searchRecipes(
            @RequestParam(required = false) String calories,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String cuisine,
            @RequestParam(required = false, name = "total_time") String totalTime,
            @RequestParam(required = false) String rating) {
        List<Recipe> recipes = service.search(calories, title, cuisine, totalTime, rating);
        return ResponseEntity.ok(Map.of("data", recipes));
    }
}

