import React, {Fragment, useState, useEffect, useRef} from 'react';
import NavBar from "./components/layouts/NavBar";
import Footer from "./components/layouts/Footer";
import Home from "./components/body/Home";
import AdminPanel from "./components/body/AdminPanel";
import RegisterPage from "./components/body/forms/RegisterForm";
import LoginPage from "./components/body/forms/LoginForm";
import CheckoutForm from "./components/body/forms/CheckoutForm";
import UserProfile from "./components/body/UserProfile";
import ViewProduct from "./components/body/subBody/ViewProduct";
import SingleProduct from "./components/body/SingleProduct";
import ContactForm from "./components/body/forms/ContactForm";
import Messages from "./components/body/Messages";
import Cart from "./components/body/subBody/Cart";
import TransactionsAdmin from "./components/body/TransactionsAdmin";
import Unauthorized from "./components/body/Unauthorized";
import {BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom";

const App = () => {

    const [genderCategories,setGenderCategories] = useState([]);
    const [categories,setCategories] = useState([]);
    const [products,setProducts] = useState([]);
    const [stocks,setStocks] = useState([]);
    const [transactions,setTransactions] = useState([]);
    const [messages,setMessages] = useState([]);
    const [preCart,setPreCart] = useState([]);
    const [user,setUser] = useState();
    const [clrTotal,setTotal] = useState();
    const [clrCartNum,setNoOfCart] = useState();
    const [cartRef,setCartRef] = useState();
    const cartButtonRef = useRef();
    const changeQuantityRef = useRef();
    const addToCartRef = useRef();

    useEffect(() => {

        let jsonUser = localStorage.getItem("user");
        let userInfo = JSON.parse(jsonUser);

        if(userInfo){
            setUser(userInfo);
        }

        fetch("http://localhost:3001/gender-categories",{
            method : "GET"
        })
        .then(data => data.json())
        .then(genders => setGenderCategories(genders))

        fetch("http://localhost:3001/categories",{
            method : "GET"
        })
        .then(data => data.json())
        .then(allCategories => setCategories(allCategories))

        fetch("http://localhost:3001/products",{
            method : "GET"
        })
        .then(data => data.json())
        .then(allProducts => setProducts(allProducts))

        fetch("http://localhost:3001/stocks",{
            method : "GET"
        })
        .then(data => data.json())
        .then(allStocks => setStocks(allStocks))

        if(userInfo){

            fetch("http://localhost:3001/transactions",{
                method : "GET",
                headers : {
                    "Authorization" : localStorage.getItem("token")
                }
            })
            .then(data => data.json())
            .then(transacs => {
                setTransactions(transacs);
            })

            // if(userInfo.role === "Admin"){
                fetch("http://localhost:3001/messages",{
                    method : "GET",
                    headers : {
                        "Authorization" : localStorage.getItem("token")
                    }
                })
                .then(data => data.json())
                .then(result => {
                    setMessages(result);
                    console.log(result)
                })
            // }
        }

    },[])

    const viewProductHandle = (prod) => {
        localStorage.setItem("view",prod);
    }

    // CART
    const exportQuantityRefHandle = (ref) => {
        changeQuantityRef.current = ref;
    }

    const exportAddCartRefHandle = (ref) => {
        addToCartRef.current = ref;
    }

    const totalHandle = (n) => {
        setTotal(n);
    }

    const noOfCartHandle = (n) => {
        setNoOfCart(n);
    }

    const cartRefHandle = (ref) => {
        setCartRef(ref);
        cartButtonRef.current = ref;
        // console.log(ref)
    }

    return(
        <Router>
            <NavBar/>
            <Cart products={products} categories={categories} cartRef={cartRefHandle}exportQuantityHandle={exportQuantityRefHandle} exportAddCartHandle={exportAddCartRefHandle}/>
            <Switch>
                <Route exact path = "/">
                    <Home products={products} categories={categories} genderCategories={genderCategories} product={viewProductHandle} cartTotal={totalHandle} noOfCart={noOfCartHandle} cartRef={cartRef} cartButtonRef={cartButtonRef}changeQuantityRef={changeQuantityRef} addToCartRef={addToCartRef}/>
                </Route>
                <Route path = "/user">
                    <UserProfile transactions={transactions}/>
                </Route>
                <Route path = "/checkout">
                    <CheckoutForm products={products} user={user} stocks={stocks}/>
                </Route>
                <Route path = "/product">
                    <ViewProduct products={products} categories={categories} changeQuantityRef={changeQuantityRef} addToCartRef={addToCartRef}/>
                </Route>
                <Route path = "/products">
                    <SingleProduct products={products} categories={categories} changeQuantityRef={changeQuantityRef} addToCartRef={addToCartRef}/>
                </Route>
                <Route path = "/contact">
                    <ContactForm />
                </Route>
                <Route path = "/login">
                    <LoginPage />
                </Route>
                <Route path = "/register">
                    <RegisterPage />
                </Route>
                <Route path = "/transactions">
                    {
                        user ? 
                            user.role === "Admin" ?
                                <TransactionsAdmin transactions = {transactions}/>
                            :
                            <Unauthorized />
                        :
                        <Unauthorized />
                    }
                </Route>
                <Route path = "/admin-panel">
                    {
                        user ?
                            user.role === "Admin" ?
                                <AdminPanel categoryGenders = {genderCategories} categories={categories} products={products}/>
                            :
                            <Unauthorized />
                        :
                        <Unauthorized />
                    }
                </Route>
                <Route path = "/admin-messages">]
                    {
                        user ?
                            user.role === "Admin" ?
                                <Messages messages={messages}/>
                            :
                            <Unauthorized />
                        :
                        <Unauthorized />
                    }
                </Route>
                <Route path = "/unauthorized">
                    <Unauthorized />
                </Route>
            </Switch>
            <Footer/>
        </Router>
    )
}

export default App;
