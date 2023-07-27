/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */

// Importing the required libraries for the project
import { useEffect, useState } from "react";
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from "./Components/News/NewsCards";
import { Box, CardMedia } from "@mui/material";
import wordToNumbers from "word-to-numbers";
import Weather from "./Components/Weather/Weather";
import Summarizer from "./Components/Summarizer/Summarizer";
import axios from "axios";

// Alan AI Voice Assistant API key

const alanKey = 'b4ca04be415c55c2fcb68dc0810b885e2e956eca572e1d8b807a3e2338fdd0dc/stage';


const App = () => {
  // Declare the useState
  const [newsArticles, setNewsArticles] = useState([])
  const [weatherUpdate, setweatherUpdate] = useState()
  const [activeArticle, setActiveArticle] = useState(-1)
  const [Summary, setSummary] = useState()
  const [ArticleSummary, setArticleSummary] = useState()

  // Create a function to handle the fetching of summary 

  const handleSummary = async (link) => {
    setArticleSummary("")
    // Create an Object variable to add the required option for api request
    const options = {
      method: 'GET',
      url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
      // set the parameters of API
      params: {
        url: link,
        length: '2'
      },
      // Set the headers in which we provide the user API key and API host link
      headers: {
        'X-RapidAPI-Key': ' e494e12da1msha7c5d90c51ffb8dp1ab3fajsn939702fb0f8b',
        'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
      }
    };

    // Wrap the whole process of fetching in tryCatch()

    try {
      const response = await axios.request(options);
      console.log(response);
      setArticleSummary(response.data.summary)
    } catch (error) {
      console.error(error);
    }
  }


  // using useEffect hook for handling State Lifecycle

  useEffect(() => {
    // Using the Alan API
    alanBtn({
      zIndex: 41,
      // put the API key in the API using procedure
      key: alanKey,
      // receiving the commands from backend of Alan AI from ALan AI Studio
      onCommand: async ({ command, articles, number, Weather }) => {
        // for "newHeadline" Command to fetching the news on user request
        if (command === 'newHeadline') {
          console.log(articles);
          setNewsArticles(articles)
          setActiveArticle(-1)
          setweatherUpdate()
          setSummary()
        }

        // for "highlight" Command to reading the title of news on user request
        else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1)
          setSummary()
          setweatherUpdate()
        }

        // for "open" Command to open the link on user request
        else if (command === 'open') {
          // logic for converting the words into numbers through words-to-numbers library
          const parsedNumber = wordToNumbers(number, { fuzzy: true })
          const article = articles[parsedNumber - 1];
          console.log(article)
          setSummary()
          setweatherUpdate()

          // if article available then open the article in new tab
          if (article) {
            window.open(article.link, "_blank")
          }
          // console.log(parsedNumber);

        }

        // for "weather" Command to show the weather updates on user request
        else if (command === 'weather') {
          setweatherUpdate(Weather)
          setSummary()
          console.log(Weather)
        }

        // for "Summarizer" Command to summarize the article on user request
        else if (command === 'Summarizer') {
          setweatherUpdate()
          setSummary()
          setArticleSummary()

          // logic for converting the words into numbers using word-to-numbers library
          const parsedNumber = wordToNumbers(number, { fuzzy: true })
          const article = await articles[parsedNumber - 1];
          // console.log({articles,article})

          // If article available that is requested by user the summarize the article
          if (article) {
            console.log(article.link)
            setSummary(article)
            await handleSummary(article.link)
          }

        }
      }
    });
  }, []);


  return (
    <>
      {/* If there is data in Summary available then run this either do nothing */}
      {Summary ? <Summarizer Summary={Summary} ArticleSummary={ArticleSummary} /> : ""}
      <div className="flex flex-col md:flex-row justify-evenly items-center">
        <Box className="w-[12rem]">
          {/* Logo Image */}
          <CardMedia
            // style={Styles.alanLogo}
            // sm={Styles.alanLogo.sm}
            className="my-12"
            component="img"
            alt="alan ai image"
            src='/alan-logo-horizontal-color.png'
          />
          {/* <imag style={Styles.alanLogo}  src='https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg' alt="alan ai image" /> */}
        </Box>
        {/* If there is data in weatherUpdate available then run this either do nothing */}
        {weatherUpdate ? <Weather Weather={weatherUpdate} /> : ""}
      </div>
      {/* passing the props in Newscards Component */}
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </>

  )
}
// Exporting the App.jsx
export default App