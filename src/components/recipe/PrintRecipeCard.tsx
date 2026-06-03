import { Clock, ChefHat, Users, Utensils } from "lucide-react";
import { Recipe } from "@/lib/mock-data";
import { scaleQuantity } from "@/lib/scale-quantity";

interface PrintRecipeCardProps {
  recipe: Recipe;
  servings: number;
  ratio: number;
  isAdjusted: boolean;
  baseServings: number;
}

export function PrintRecipeCard({ recipe, servings, ratio, isAdjusted, baseServings }: PrintRecipeCardProps) {
  const url = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="print-recipe-card">
      {/* Header band */}
      <div className="print-header">
        <div className="print-header-left">
          <p className="print-brand">South Spice</p>
          <p className="print-region">{recipe.region}</p>
        </div>
        <div className="print-header-right">
          {recipe.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="print-tag">{tag}</span>
          ))}
        </div>
      </div>

      {/* Hero image */}
      <div className="print-hero">
        <img src={recipe.image} alt={recipe.title} className="print-hero-img" />
      </div>

      {/* Title */}
      <h1 className="print-title">{recipe.title}</h1>
      <p className="print-description">{recipe.description}</p>

      {/* Stats row */}
      <div className="print-stats">
        <div className="print-stat">
          <Utensils className="print-stat-icon" />
          <div>
            <p className="print-stat-label">Prep</p>
            <p className="print-stat-value">{recipe.prepTime.split("(")[0].trim()}</p>
          </div>
        </div>
        <div className="print-stat">
          <Clock className="print-stat-icon" />
          <div>
            <p className="print-stat-label">Cook</p>
            <p className="print-stat-value">{recipe.cookingTime}</p>
          </div>
        </div>
        <div className="print-stat">
          <Users className="print-stat-icon" />
          <div>
            <p className="print-stat-label">Serves</p>
            <p className="print-stat-value">{servings}</p>
          </div>
        </div>
        <div className="print-stat">
          <ChefHat className="print-stat-icon" />
          <div>
            <p className="print-stat-label">Level</p>
            <p className="print-stat-value">{recipe.difficulty}</p>
          </div>
        </div>
      </div>

      {isAdjusted && (
        <p className="print-scaled">
          Scaled for {servings} {servings === 1 ? "serving" : "servings"} (originally {baseServings}).
        </p>
      )}

      {/* Two-column layout */}
      <div className="print-columns">
        {/* Ingredients column */}
        <div className="print-ingredients-col">
          <h2 className="print-section-title">Ingredients</h2>
          {recipe.ingredients.map((group) => (
            <div key={group.group} className="print-ingredient-group">
              <h3 className="print-ingredient-group-title">{group.group}</h3>
              <ul className="print-ingredient-list">
                {group.items.map((item) => (
                  <li key={item.name} className="print-ingredient-item">
                    <span>{item.name}</span>
                    <span>{scaleQuantity(item.quantity, ratio)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Method column */}
        <div className="print-method-col">
          <h2 className="print-section-title">Method</h2>
          <ol className="print-method-list">
            {recipe.steps.map((step, idx) => (
              <li key={idx} className="print-method-step">
                <span className="print-step-number">{idx + 1}</span>
                <div>
                  <p className="print-step-title">{step.title}</p>
                  <p className="print-step-body">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Tips */}
      {recipe.tips.length > 0 && (
        <div className="print-tips">
          <h2 className="print-section-title">Cook&apos;s Notes</h2>
          <ul className="print-tips-list">
            {recipe.tips.map((tip, idx) => (
              <li key={idx} className="print-tip-item">
                <span className="print-tip-dash">—</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer */}
      <div className="print-footer">
        <p>Find the full recipe with photos and notes at</p>
        <p className="print-url">{url}</p>
        <p className="print-copyright">
          &copy; {new Date().getFullYear()} South Spice · Printed from southspice.app
        </p>
      </div>
    </div>
  );
}
