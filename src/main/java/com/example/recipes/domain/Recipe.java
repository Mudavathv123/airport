package com.example.recipes.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "recipes")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100)
    private String cuisine;

    @Column(length = 255)
    private String title;

    @Column
    private Double rating;

    @Column(name = "prep_time")
    private Integer prepTime;

    @Column(name = "cook_time")
    private Integer cookTime;

    @Column(name = "total_time")
    private Integer totalTime;

    @Column(columnDefinition = "TEXT")
    private String description;

    // Store full nutrients JSON as string; exposed as nested object via accessors
    @JsonIgnore
    @Column(columnDefinition = "JSON")
    private String nutrients;

    @Transient
    @JsonProperty("nutrients")
    public Map<String, Object> getNutrientsObject() {
        if (this.nutrients == null || this.nutrients.isBlank()) {
            return null;
        }
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(this.nutrients, new TypeReference<Map<String, Object>>() {});
        } catch (Exception e) {
            return null;
        }
    }

    @JsonProperty("nutrients")
    public void setNutrientsObject(Map<String, Object> nutrients) {
        if (nutrients == null) {
            this.nutrients = null;
            return;
        }
        try {
            ObjectMapper mapper = new ObjectMapper();
            this.nutrients = mapper.writeValueAsString(nutrients);
        } catch (Exception e) {
            this.nutrients = null;
        }
    }

    // Denormalized calories for efficient filtering
    @Column
    private Integer calories;

    @Column(length = 50)
    private String serves;
}

