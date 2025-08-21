package com.example.recipes.repository;

import com.example.recipes.domain.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    Page<Recipe> findAllByOrderByRatingDescIdAsc(Pageable pageable);
}

