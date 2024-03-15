import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FiltreAll } from './all';
import { FiltreC } from './all-c';
import { FiltreMicro } from './all-micro'
import { FiltreApple } from './all-apple';

export const AllProd = () => {

    const [filtreAll, setFiltreAll] = useState(true);
    const [filtreC, setFiltreC] = useState(false);
    const [filtreMicro, setFiltreMicro] = useState(false);
    const [filtreApple, setFiltreApple] = useState(false);

    const handleAll = () => {
        setFiltreAll(true)
        setFiltreC(false)
        setFiltreMicro(false)
        setFiltreApple(false)
    }
    const handleC = () => {
        setFiltreAll(false)
        setFiltreC(true)
        setFiltreMicro(false)
        setFiltreApple(false)
    }
    const handleMicro = () => {
        setFiltreAll(false)
        setFiltreC(false)
        setFiltreMicro(true)
        setFiltreApple(false)
    }
    const handleApple = () => {
        setFiltreAll(false)
        setFiltreC(false)
        setFiltreMicro(false)
        setFiltreApple(true)
    }
    return (
        <div className="all-produits-cable">
            <div className="filtre-produits">
                <div className={"filtre-prod-cable " + (filtreAll ? "active" : "")} onClick={handleAll}>All</div>
                <div className={"filtre-prod-cable " + (filtreC ? "active" : "")} onClick={handleC}>C</div>
                <div className={"filtre-prod-cable " + (filtreMicro ? "active" : "")} onClick={handleMicro}>Micro</div>
                <div className={"filtre-prod-cable " + (filtreApple ? "active" : "")} onClick={handleApple}>Apple</div>
            </div>
            {filtreAll ? <FiltreAll /> : ""}
            {filtreC ? <FiltreC /> : ""}
            {filtreMicro ? <FiltreMicro /> : ""}
            {filtreApple ? <FiltreApple /> : ""}
        </div>
    )
}
