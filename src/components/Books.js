import React, {useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {Grid, Link, Paper} from "@material-ui/core";
import firebase from "firebase";
import {Home, Router} from "@material-ui/icons";
import ReactDOM from 'react-dom';
import Pdf from "./Pdf";
import * as path from "path";
import {Route, Switch} from "react-router-dom";
import PDFViewer from "pdf-viewer-reactjs";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        width: "100%",
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    bookGridItem: {
        maxWidth: "max-content",
        margin: theme.spacing(1)
    },
    bookGrid: {

    },
    bookImg: {
        width: "200px",
        height: "270px",
        objectFit: "fill"
    },
    toolbar: {
        minHeight: 120
    }
}));

const handleLoadSection = (index) => {

}

export default function MyDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [bgr_books, setBgrBooks] = React.useState([])
    const [mv_books, setMvBooks] = React.useState([])
    const [enr_books, setEnrBooks] = React.useState([])
    const [hrr_books, setHrrBooks] = React.useState([])
    const [spr_books, setSprBooks] = React.useState([])
    const [section, setSection] = React.useState(0)
    const [book, setBook] = React.useState("")
    const mounted = React.useRef()

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const path = props.location.pathname
        const qu = path.slice(7)

        const dbr = firebase.database().ref().child("Book").orderByChild('book_type').equalTo(qu);
        dbr.once('value')
            .then(async (ds) => {
                ds.forEach((item) => {
                    const tmp = []
                    tmp.push({
                        ...item.val()
                    })
                    setBgrBooks(bgr_books => bgr_books.concat(tmp))
                })
            })
    }, [])

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Book Bucket
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button onClick={() => {window.open("/", "_self")}}>
                        <ListItemIcon><Home/></ListItemIcon>
                        <ListItemText primary={"Home"}/>
                    </ListItem>
                    <ListItem button onClick={() => {
                        setSection(0)
                    }}>
                        <ListItemIcon><InboxIcon/></ListItemIcon>
                        <ListItemText primary={"Book"}/>
                    </ListItem>
                    <ListItem button onClick={() => {
                        setSection(1)
                    }}>
                        <ListItemIcon><InboxIcon/></ListItemIcon>
                        <ListItemText primary={"Audio Book"}/>
                    </ListItem>

                </List>
                <Divider />
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}>
                <div className={classes.drawerHeader} />
                <div className={classes.bookGrid} hidden={section!==0}>
                    <Grid
                        container>
                        {
                            bgr_books.map((item, index) =>
                                <Grid
                                    component={Paper}
                                    md={3}
                                    item
                                    className={classes.bookGridItem}
                                    key={index}
                                    container
                                    direction={"column"}>
                                    <Grid
                                        item>
                                        <a href='#' onClick={(e) => e.preventDefault()}>
                                            <img
                                                className={classes.bookImg}
                                                src={item.book_banner}
                                                alt={""}
                                                onClick={() => {
                                                    /*ReactDOM.render(
                                                        <Pdf book_pdf={item.book_pdf} />,
                                                        document.getElementById('root'))*/
                                                    setBook(item.book_pdf)
                                                    setSection(2)
                                                }}
                                            />
                                        </a>
                                        <Typography align={"center"} variant={"body1"}>
                                            {item.book_name}'
                                        </Typography>
                                        <Typography align={"center"} variant={"body1"}>
                                            {item.book_price}&#8377;
                                        </Typography>
                                    </Grid>
                                </Grid>
                            )
                        }
                    </Grid>
                </div>
                {
                    section === 1 ?
                        <Grid
                            component={"div"}
                            container
                            className={classes.bookGrid} hidden={section!==1}>
                            {
                                bgr_books.map((item, index) =>
                                    <Grid
                                        component={Paper}
                                        md={3}
                                        item
                                        className={classes.bookGridItem}
                                        key={index}
                                        container
                                        direction={"column"}>
                                        <Grid
                                            item>
                                            <a href={item.audio_book}>
                                                <img
                                                    className={classes.bookImg}
                                                    src={item.book_banner}
                                                    alt={""}
                                                />
                                            </a>
                                            <Typography align={"center"} variant={"body1"}>
                                                {item.book_name}
                                            </Typography>
                                            <Typography align={"center"} variant={"body1"}>
                                                {item.book_price}&#8377;
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                )
                            }
                        </Grid>
                        :
                        null
                }
                {
                    section === 2 ?
                        <div className={classes.bookGrid}>
                            <button onClick={()=>{setSection(0)}}>Back</button>
                            <Pdf book_pdf={book} />
                        </div>
                        :
                        null
                }

            </main>
        </div>
    );
}
