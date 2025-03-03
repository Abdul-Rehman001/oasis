// services/menuService.ts
import { MenuItem } from "../lib/types";

interface MenuResponse {
  success: string;
  data: {
    menuList: MenuItem[];
  };
  message: string;
}

export const menuService = {
  async getMenuItems(storeId: string): Promise<MenuItem[]> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/restaurant/get-all-menu/?id=${storeId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch menu items");
      }

      const data: MenuResponse = await response.json();

      // Transform the API response to match the MenuItem interface
      return data.data.menuList.map((item) => ({
        _id: item._id,
        id: item._id,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        dietary: item.dietary,
        category: item.category,
      }));
    } catch (error) {
      console.error("Error fetching menu items:", error);
      return [];
    }
  },
};
