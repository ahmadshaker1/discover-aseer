export interface Recipe {
  id: string;
  title: string;
  timeToPrepare: number;
  mainIngredient: string;
  image: string;
  rating: number;
  reviews: number;
}

export interface ApiRecipe {
  id: string;
  status: string;
  sort: number | null;
  user_created: string;
  date_created: string;
  user_updated: string | null;
  date_updated: string | null;
  title: string;
  time_to_prepare: number;
  time_to_cook?: string;
  main_ingredient: string;
  thumbnail: string;
  ingredients?: string[];
  content?: string;
}

export interface ApiResponse {
  data: ApiRecipe[];
}

export const transformRecipe = (
  apiRecipe: ApiRecipe,
  directusUrl: string
): Recipe => {
  const imageUrl = apiRecipe.thumbnail
    ? `${directusUrl}/assets/${apiRecipe.thumbnail}`
    : "/assets/activities/aseer-cuisine.jpg"; // Default fallback image

  // Format time to prepare as "X دقيقة"
  const timeToPrepare = apiRecipe.time_to_prepare || 0;

  // Default values for rating and reviews (not in API)
  const rating = 4.8;
  const reviews = 233;

  return {
    id: apiRecipe.id,
    title: apiRecipe.title?.trim() || "",
    timeToPrepare: timeToPrepare,
    mainIngredient: apiRecipe.main_ingredient?.trim() || "",
    image: imageUrl,
    rating: rating,
    reviews: reviews,
  };
};

export const fetchRecipes = async (): Promise<Recipe[]> => {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL;

  if (!directusUrl) {
    console.error("NEXT_PUBLIC_DIRECTUS_APP_URL is not set");
    return [];
  }

  try {
    const response = await fetch(`${directusUrl}/items/recipes`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch recipes: ${response.statusText}`);
    }

    const apiData: ApiResponse = await response.json();
    return apiData.data
      .filter((recipe) => recipe.status === "published" || recipe.status === "draft")
      .map((recipe) => transformRecipe(recipe, directusUrl));
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};
