import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailData, setRecipeDetailData] = useState(null);
  const [favoritesList, setFavoritesList] = useState([]);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault(); //如果事件可以被取消，就取消事件（即取消事件的預設行為）。但不會影響事件的傳遞，事件仍會繼續傳遞。
    setLoading(true);
    try {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data = await response.json();
      console.log(data);
      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setSearchParam("");
        setLoading(false);
        navigate("/"); //跳轉到Home page
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      setLoading(false);
      setSearchParam("");
    }
  }
  function handleAddToFavorite(getCurrentItem) {
    console.log(getCurrentItem);
    let cpyFavoritesList = [...favoritesList];
    let index = cpyFavoritesList.findIndex(
      (item) => item.id === getCurrentItem.id
    );
    if (index === -1) cpyFavoritesList.push(getCurrentItem);
    else cpyFavoritesList.splice(index);

    setFavoritesList(cpyFavoritesList);
  }
  console.log(loading, recipeList);
  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        recipeList,
        setSearchParam,
        handleSubmit,
        recipeDetailData,
        setRecipeDetailData,
        favoritesList,
        setFavoritesList,
        handleAddToFavorite,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
