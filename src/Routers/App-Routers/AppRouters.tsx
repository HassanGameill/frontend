import React from 'react'
import {lazy, Suspense} from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Component Page Suspense Feedback
import {PageSuspenseFeedback} from "../../Components/Feedback/index"
import {LottieHandler} from "../../Components/Feedback/index"


// ==== layouts =====
const MainLayout = lazy(() => import('../../Layouts/Main-Layout/MainLayout'));
const ProfileLayout = lazy(() => import('../../Layouts/ProfileLayout/ProfileLayout'));

// ==== Pages =====
const Home = lazy(() => import('../../Pages/Home/Home'));
const Products = lazy(() => import('../../Pages/Products/Products'));
const Cart = lazy(() => import('../../Pages/Cart/Cart'));
const Wishlist = lazy(() => import('../../Pages/Wishlist/Wishlist'));
const Categories = lazy(() => import('../../Pages/Categories/Categories'));
const Profile = lazy(() => import('../../Pages/User-Auth/Profile/Profile'));
const Login = lazy(() => import('../../Pages/User-Auth/Login/Login'));
const Register = lazy(() => import('../../Pages/User-Auth/Register/Register'));

// ==== Prifile Page ====
const Orders = lazy(() => import('../../Pages/Orders/Orders'));


// ==== Error Page ====
import Error from '../../Pages/Error/Error'

// ==== Protected Route =====
import ProtectedRoute from "../../Components/AuthProtected/ProtectedRoute"


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <div className="mt-[25%]">
            <LottieHandler type="loading" message="Loading please wait..." />
          </div>
        }
      >
        <MainLayout />
      </Suspense>
    ),
    
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
         <PageSuspenseFeedback>
           <Home />
         </PageSuspenseFeedback>
        )
      },
      
      {
        path: "categories",
        element: (
          <PageSuspenseFeedback>
             <Categories />
          </PageSuspenseFeedback>
        ),
      },
      
      {
        path: "cart",
        element: (
          <PageSuspenseFeedback>
            <Cart />
          </PageSuspenseFeedback>
        ),
      },
      
      
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <PageSuspenseFeedback>
             <Wishlist />
            </PageSuspenseFeedback>
          </ProtectedRoute>
        ),
      },
      
      {
        path: "login",
        element: (
          <PageSuspenseFeedback>
           <Login />
          </PageSuspenseFeedback>
        ),
      },
      
      {
        path: "register",
        element: (
          <PageSuspenseFeedback>
           <Register />
          </PageSuspenseFeedback>
        ),
      },
      
      {
        path: "categories/products/:prefix",
        element: (
          <PageSuspenseFeedback>
           <Products />
          </PageSuspenseFeedback>
        ),
        loader: ({params}) => {
          if (typeof params.prefix !== 'string' || !/^[a-z]+$/i.test(params.prefix)) {
            throw new Response("Bad Request", {
              statusText: 'Category not found',
              status: 400,
              
            });
          }
          return true;
        } ,
      },
      
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <PageSuspenseFeedback>
             <ProfileLayout />
            </PageSuspenseFeedback>
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PageSuspenseFeedback>
               <Profile />
              </PageSuspenseFeedback>
            ),
          },
          
          {
            path: "orders",
            element: (
              <PageSuspenseFeedback>
               <Orders />
              </PageSuspenseFeedback>
            ),
          },
          
          
        ]
          
      },
      
    ],
  },
]);


const AppRouters = () => {
  return <RouterProvider router={router}/>;
  
}

export default AppRouters