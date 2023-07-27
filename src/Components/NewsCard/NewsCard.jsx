/* eslint-disable react/prop-types */

// Importing the  
import { Card,CardActions,CardActionArea,CardContent,CardMedia,Button,Typography } from "@mui/material";
import classNames from "classnames";
import {createUseStyles} from 'react-jss'
import { useEffect,useState,createRef } from "react";


// Styling in JS Objects by creating the Customize hook
const useStyles = createUseStyles({
  media: {
    height: 250,
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderBottom: '10px solid white',
  },
  activeCard: {
    borderBottom: '10px solid #22289a',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  });


const NewsCard = ({article:{excerpt,published_date,clean_url,title,link,media
},i,activeArticle}) => {

  // Declare the useState Hook
  const [elRefs, setElRefs] = useState([]);
  // Handle the scrolling during reciting the headlines
  const scrollToRef = (ref) => window.scroll(0,ref.current.offsetTop-50)

  // using the useEffect hook to create the 50 empty array to map to create scrolling effect during highlight reading on the page mounting
  useEffect(() => {
  setElRefs((refs)=>Array(50).fill().map((_,j)=>refs[j]|| createRef()))
    
  }, [])

  // Using another useEffect Hook to create the scroll effect

  useEffect(() => {
   if(i===activeArticle && elRefs[activeArticle]){
    scrollToRef(elRefs[activeArticle])
   }
  
  }, [i,activeArticle,elRefs])
  
  
  // using the useStyle hook
  const classes = useStyles();
  return (
    
    <Card ref={elRefs[i]} className={classNames(classes.card,activeArticle===i?classes.activeCard:null)}>
      <CardActionArea href={link} target="_blank" >
        <CardMedia className={classes.media} image={media
 || "https://www.niddk.nih.gov/-/media/Images/Components/Default-Social-Media-Images/News-Card.png"} />
        <div className={classes.details} >
          <Typography variant='body2' color="textSecondary" component="h2" >{(new Date(published_date)).toDateString()}</Typography>
          <Typography variant='body2' color="textSecondary" component="h2" >{clean_url}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h5" >{title}</Typography>
        <CardContent >
          <Typography variant="body2" color="textSecondary" component="p">{excerpt}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button className="btn" size="small" color="primary">Learn More</Button>
          <Typography variant="h5" color="textSecondary">{i + 1}</Typography>
      </CardActions>
    </Card>
  )
}

export default NewsCard