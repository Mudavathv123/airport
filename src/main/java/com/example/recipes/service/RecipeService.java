package com.example.recipes.service;

import com.example.recipes.domain.Recipe;
import org.springframework.data.domain.Page;

import java.util.List;

public interface RecipeService {
    Page<Recipe> getAllSortedByRating(int page, int limit);

    List<Recipe> searchRecipes(String calories,
                               String title,
                               String cuisine,
                               String totalTime,
                               String rating);
}

