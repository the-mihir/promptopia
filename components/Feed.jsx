'use client';

import { useState, useEffect } from 'react';
import PromptCard from "@/components/PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => (
                <PromptCard
                    key={post._id}  // Fixed key usage
                    post={post}
                    handleTagClick={handleTagClick}  // Corrected handleTagClick prop
                />
            ))}
        </div>
    );
}

const Feed = () => {
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);
    const [allPosts, setAllPosts] = useState([]);

    const fetchPosts = async () => {
        const response = await fetch('/api/prompt');
        const data = await response.json();
        setAllPosts(data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const filterPrompts = (searchText) => {
        const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
        return allPosts.filter(
            (item) =>
                regex.test(item.creator.username) ||
                regex.test(item.tag) ||
                regex.test(item.prompt)
        );
    };

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        // debounce method
        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterPrompts(e.target.value);
                setSearchedResults(searchResult);
            }, 500)
        );
    };

    const handleTagClick = (tagName) => {
        setSearchText(tagName);
        const searchResult = filterPrompts(tagName);
        setSearchedResults(searchResult);
    };

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for tag or username"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                />
            </form>

            {/* All Prompts */}
            <PromptCardList
                data={searchText ? searchedResults : allPosts}
                handleTagClick={handleTagClick}
            />
        </section>
    );
};

export default Feed;
