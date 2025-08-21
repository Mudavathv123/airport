package com.example.recipes.service;

import com.example.recipes.model.Recipe;
import com.example.recipes.repo.RecipeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RecipeService {

    private final RecipeRepository repository;

    public RecipeService(RecipeRepository repository) {
        this.repository = repository;
    }

    public Page<Recipe> getAll(int page, int limit) {
        if (page < 1) page = 1;
        if (limit < 1) limit = 10;
        return repository.findAll(PageRequest.of(page - 1, limit, Sort.by(Sort.Direction.DESC, "rating")));
    }

    public List<Recipe> search(String caloriesCmp, String title, String cuisine, String totalTimeCmp, String ratingCmp) {
        Specification<Recipe> spec = Specification.where(null);

        if (title != null && !title.isBlank()) {
            final String pattern = "%" + title.toLowerCase() + "%";
            spec = spec.and((root, q, cb) -> cb.like(cb.lower(root.get("title")), pattern));
        }
        if (cuisine != null && !cuisine.isBlank()) {
            spec = spec.and((root, q, cb) -> cb.equal(root.get("cuisine"), cuisine));
        }
        if (ratingCmp != null && !ratingCmp.isBlank()) {
            final var cmp = Comparator.parse(ratingCmp);
            if (cmp == null) throw new IllegalArgumentException("Invalid rating comparator");
            spec = spec.and((root, q, cb) -> cmp.toPredicate(cb, root.get("rating")));
        }
        if (totalTimeCmp != null && !totalTimeCmp.isBlank()) {
            final var cmp = Comparator.parse(totalTimeCmp);
            if (cmp == null) throw new IllegalArgumentException("Invalid total_time comparator");
            spec = spec.and((root, q, cb) -> cmp.toPredicate(cb, root.get("totalTime")));
        }
        if (caloriesCmp != null && !caloriesCmp.isBlank()) {
            final var cmp = Comparator.parse(caloriesCmp);
            if (cmp == null) throw new IllegalArgumentException("Invalid calories comparator");
            spec = spec.and((root, q, cb) -> cmp.toPredicate(cb, root.get("calories")));
        }

        return repository.findAll(spec, Sort.by(Sort.Direction.DESC, "rating"));
    }

    public static class Comparator {
        public enum Op { LT, GT, LTE, GTE, EQ }
        public final Op op; public final double value;
        public Comparator(Op op, double value) { this.op = op; this.value = value; }
        public static Comparator parse(String input) {
            if (input == null) return null;
            String s = input.trim();
            Op op;
            if (s.startsWith("<=")) { op = Op.LTE; s = s.substring(2); }
            else if (s.startsWith(">=")) { op = Op.GTE; s = s.substring(2); }
            else if (s.startsWith("<")) { op = Op.LT; s = s.substring(1); }
            else if (s.startsWith(">")) { op = Op.GT; s = s.substring(1); }
            else if (s.startsWith("=")) { op = Op.EQ; s = s.substring(1); }
            else return null;
            try { double v = Double.parseDouble(s.trim()); return new Comparator(op, v); }
            catch (NumberFormatException e) { return null; }
        }
        public <N extends Number> jakarta.persistence.criteria.Predicate toPredicate(jakarta.persistence.criteria.CriteriaBuilder cb, jakarta.persistence.criteria.Path<N> path) {
            return switch (op) {
                case LT -> cb.lt(path, value);
                case GT -> cb.gt(path, value);
                case LTE -> cb.le(path, value);
                case GTE -> cb.ge(path, value);
                case EQ -> cb.equal(path, value);
            };
        }
    }
}

