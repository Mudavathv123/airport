package com.example.recipes.model;

import jakarta.persistence.*;

@Entity
@Table(name = "recipes")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cuisine;
    private String title;
    private Double rating;
    private Integer prepTime;
    private Integer cookTime;
    private Integer totalTime;

    @Lob
    @Column(columnDefinition = "CLOB")
    private String description;

    @Lob
    @Column(columnDefinition = "CLOB")
    private String nutrientsJson;

    private String serves;

    // Denormalized calories for efficient filtering
    private Double calories;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCuisine() { return cuisine; }
    public void setCuisine(String cuisine) { this.cuisine = cuisine; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
    public Integer getPrepTime() { return prepTime; }
    public void setPrepTime(Integer prepTime) { this.prepTime = prepTime; }
    public Integer getCookTime() { return cookTime; }
    public void setCookTime(Integer cookTime) { this.cookTime = cookTime; }
    public Integer getTotalTime() { return totalTime; }
    public void setTotalTime(Integer totalTime) { this.totalTime = totalTime; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getNutrientsJson() { return nutrientsJson; }
    public void setNutrientsJson(String nutrientsJson) { this.nutrientsJson = nutrientsJson; }
    public String getServes() { return serves; }
    public void setServes(String serves) { this.serves = serves; }
    public Double getCalories() { return calories; }
    public void setCalories(Double calories) { this.calories = calories; }
}

