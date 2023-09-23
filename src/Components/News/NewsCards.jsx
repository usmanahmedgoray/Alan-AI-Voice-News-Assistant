/* eslint-disable react/prop-types */

// importing the required libraries
import PropTypes from "prop-types";
import NewsCard from "../NewsCard/NewsCard";
import { Grid, Grow, Typography } from "@mui/material";

// Info Cards Array:

const infoCards = [
  {id:1, color: '#00838f', title: 'Latest News', text: 'Give me the latest news' },
  {id:2, color: '#1565c0', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'Give me the latest Technology news' },
  {id:3, color: '#4527a0', title: 'News by Terms', info: 'PlayStation 5,Bitcoin, Smartphones, Donald Trump...', text: 'What\'s up with PlayStation 5' },
  {id:4, color: '#283593', title: 'News by Sources', info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...', text: 'Give me the news from CNN' },
];

// Style Object for styling 

const Styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '22rem',
    padding: '10%',
    borderRadius: 10,
    color: 'white',
    
  },
  infoCard: {
    display: 'flex', flexDirection: 'column', textAlign: 'center',padding:"2rem" ,alignItems:'center',
    md:{
      padding:"40px"
    }
  },
  container: {
    padding: '0 4%', width: '100%', margin: 0, display: 'flex', justifyContent: 'center'
  },
 
}


const NewsCards = ({ articles,activeArticle }) => {
    // If there is no article length then return these cards 
  if (!articles.length) {
    return (
      <Grow in>
        <Grid
          style={Styles.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {infoCards.map((infoCard)=>{
            return <Grid item xs={12} sm={6} md={4} lg={3} key={infoCard.id} style={Styles.infoCard} >
              <div style={{...Styles.card,background:infoCard.color}}>
                <Typography variant="h5">{infoCard.title}</Typography>
                {infoCard.info?(
                  <Typography variant="h6" ><strong>{infoCard.info.split(" ")[2]}</strong><br/>{infoCard.info}</Typography>):null}
                  <Typography variant="h6" >Try saying : <br /> <i>{infoCard.text}</i></Typography>
              </div>
            </Grid>
          })}
        </Grid>
      </Grow>
    );
  }
  // If articles available then return these cards
  return (
    <Grow in>
      <Grid
      style={Styles.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {articles.map((article, i) => {
          return (
            <Grid
              item
              key={article.article_id}
              xs={12}
              sm={6}
              md={6}
              lg={4}
              style={{ display: "flex" }}
            >
              {/* NewsCard component  */}
              <NewsCard article={article} i={i} activeArticle={activeArticle} />
            </Grid>
          );
        })}
      </Grid>
    </Grow>
  );
};

// set the articles propType in array

NewsCards.propsTypes = {
  articles: PropTypes.array,
};

// Export the NewsCards.jsx Component

export default NewsCards;
