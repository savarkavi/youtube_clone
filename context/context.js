"use client";
import { createContext, useState, useEffect } from "react";
import { fetchFromApi } from "@/utils/api";
import { useParams } from "next/navigation";

export const context = createContext();

export const AppContext = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [mobileMenu, setMobileMenu] = useState(true);
  const { searchQuery } = useParams();

  useEffect(() => {
    fetchCategoryData(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    if (searchQuery) {
      setSelectedCategory("");
      fetchSearchData(searchQuery);
    }
  }, [searchQuery]);

  const fetchCategoryData = (query) => {
    setLoading(true);
    fetchFromApi(`search/?q=${query}`).then(({ contents }) => {
      setSearchResults(contents);
      setLoading(false);
    });
  };

  const fetchSearchData = (searchQuery) => {
    setLoading(true);
    fetchFromApi(`search/?q=${searchQuery}`).then(({ contents }) => {
      setSearchResults(contents);
      setLoading(false);
    });
  };

  return (
    <context.Provider
      value={{
        loading,
        setLoading,
        searchResults,
        setSearchResults,
        selectedCategory,
        setSelectedCategory,
        mobileMenu,
        setMobileMenu,
      }}
    >
      {children}
    </context.Provider>
  );
};
