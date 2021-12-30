import React from 'react';
import { Route, Routes } from 'react-router-dom';                  // Para poder utilizar el Switch (AHORA llamado Routes) y Route para renderizar solamente el componente indicado por la ruta del navegador.

import Titulo from './Titulo';
import MetricWrapper from './MetricWrapper';
import LastModifiedWrapper from './LastModifiedWrapper';
import CategoryWrapper from './CategoryWrapper';
import CampaignWrapper from './CampaignWrapper';
import ProductListWrapper from './ProductListWrapper';
import ProductAvailabilityWrapper from './ProductAvailabilityWrapper';
import UserListWrapper from './UserListWrapper';
import UserCountryWrapper from './UsersCountryWrapper';
import CategoryProductWrapper from './CategoryProductWrapper';
import CampaignProductWrapper from './CampaignProductWrapper';

function SectionWrapper() {                                        // Usamos Link para redireccionar a la ruta que queramos. Básicamente cambia la ruta en el navegador. Ahora con un Switch + Route podemos elegir qué renderizar leyendo esta ruta del navegador.
    return (
        <React.Fragment>
            {/* <!-- Secciones --> */}
            <div className="contenedor-secciones-tablero">

                <Routes>
                    <Route path="/" element={
                        <>
                            <Titulo titulo={"Tablero General"} />
                            <MetricWrapper />
                            <LastModifiedWrapper />
                            <CategoryWrapper />
                            <CampaignWrapper />
                        </>
                    } />
                    <Route path="/products" element={
                        <>
                            <Titulo titulo={"Seccion Productos"} />
                            <ProductListWrapper />
                            <ProductAvailabilityWrapper />
                        </>
                    } />
                    <Route path="/users" element={
                        <>
                            <Titulo titulo={"Seccion Usuarios"} />
                            <UserListWrapper />
                            <UserCountryWrapper />
                        </>
                    } />
                    <Route path="/categories" element={
                        <>
                            <Titulo titulo={"Seccion Categorias"} />
                            <CategoryProductWrapper />
                            <CategoryWrapper />
                        </>
                    } />
                    <Route path="/campaigns" element={
                        <>
                            <Titulo titulo={"Seccion Campañas"} />
                            <CampaignProductWrapper />
                            <CampaignWrapper />
                        </>
                    } />
                    <Route path="/campaigns" element={
                        <>
                            <Titulo titulo={"Seccion Campañas"} />
                            <CampaignProductWrapper />
                            <CampaignWrapper />
                        </>
                    } />
                    <Route path="*" element={<Titulo titulo={"Página no encontrada"} />} />
                </Routes>

            </div>
            {/* <!-- /Secciones --> */}
        </React.Fragment>
    )
}

export default SectionWrapper;