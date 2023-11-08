import React, { useState, useEffect } from 'react'
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { Footer } from '../../components/footer/Footer'

export const MainDashboard = () => {
    return (
        <>
            <Outlet />
            <Footer></Footer>
        </>
    )
}