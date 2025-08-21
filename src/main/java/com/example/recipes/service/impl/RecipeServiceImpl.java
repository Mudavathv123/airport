package com.example.recipes.service.impl;

import com.example.recipes.domain.Recipe;
import com.example.recipes.repository.RecipeRepository;
import com.example.recipes.service.RecipeService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.function.BiPredicate;

@Service
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;

    public RecipeServiceImpl(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    @Override
    public Page<Recipe> getAllSortedByRating(int page, int limit) {
        if (page < 1) page = 1;
        if (limit < 1) limit = 10;
        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by(Sort.Order.desc("rating"), Sort.Order.asc("id")));
        return recipeRepository.findAll(pageable);
    }

    @Override
    public List<Recipe> searchRecipes(String calories, String title, String cuisine, String totalTime, String rating) {
        List<Recipe> all = recipeRepository.findAll();

        List<Recipe> filtered = new ArrayList<>(all);

        if (title != null && !title.isBlank()) {
            String t = title.toLowerCase(Locale.ROOT);
            filtered.removeIf(r -> r.getTitle() == null || !r.getTitle().toLowerCase(Locale.ROOT).contains(t));
        }
        if (cuisine != null && !cuisine.isBlank()) {
            String c = cuisine.toLowerCase(Locale.ROOT);
            filtered.removeIf(r -> r.getCuisine() == null || !r.getCuisine().toLowerCase(Locale.ROOT).equals(c));
        }

        if (calories != null && !calories.isBlank()) {
            applyNumericFilter(filtered, calories, Recipe::getCalories);
        }
        if (totalTime != null && !totalTime.isBlank()) {
            applyNumericFilter(filtered, totalTime, Recipe::getTotalTime);
        }
        if (rating != null && !rating.isBlank()) {
            applyNumericFilter(filtered, rating, Recipe::getRating);
        }

        return filtered;
    }

    private <T extends Number> void applyNumericFilter(List<Recipe> list, String expr, java.util.function.Function<Recipe, T> getter) {
        String trimmed = expr.replaceAll("\\s+", "");
        BiPredicate<Double, Double> predicate;
        double rhs;
        if (trimmed.startsWith(">=")) {
            rhs = parseDoubleSafe(trimmed.substring(2));
            predicate = (l, r) -> l != null && l >= r;
        } else if (trimmed.startsWith("<=")) {
            rhs = parseDoubleSafe(trimmed.substring(2));
            predicate = (l, r) -> l != null && l <= r;
        } else if (trimmed.startsWith(">")) {
            rhs = parseDoubleSafe(trimmed.substring(1));
            predicate = (l, r) -> l != null && l > r;
        } else if (trimmed.startsWith("<")) {
            rhs = parseDoubleSafe(trimmed.substring(1));
            predicate = (l, r) -> l != null && l < r;
        } else if (trimmed.startsWith("=")) {
            rhs = parseDoubleSafe(trimmed.substring(1));
            predicate = (l, r) -> Objects.equals(l, r);
        } else {
            rhs = parseDoubleSafe(trimmed);
            predicate = (l, r) -> Objects.equals(l, r);
        }
        if (Double.isNaN(rhs)) {
            throw new IllegalArgumentException("Invalid numeric filter: " + expr);
        }
        double finalRhs = rhs;
        list.removeIf(r -> {
            T val = getter.apply(r);
            Double left = val == null ? null : val.doubleValue();
            return !predicate.test(left, finalRhs);
        });
    }

    private double parseDoubleSafe(String s) {
        try {
            return Double.parseDouble(s);
        } catch (Exception e) {
            return Double.NaN;
        }
    }
}

