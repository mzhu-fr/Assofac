import axios from 'axios'
export async function AddProductToCart(idProduct) {
    if (!localStorage.getItem("produits")) {
        return
    } else {
        if (!localStorage.getItem("panier")) {
            return
        } else {
            var produits = localStorage.getItem("produits")
            var produitsParse = await JSON.parse(produits)
            var panier = await JSON.parse(localStorage.getItem("panier"))
            var produitAjouter = [""]
            for (let i = 0; produitsParse[i]; i++) {
                if (parseInt(produitsParse[i].idcable) === idProduct) {
                    produitAjouter = produitsParse[i]
                    produitAjouter.quantite = 1
                }
            }
            if (panier.length === 0) {
                panier.push(produitAjouter)
            } else {
                let res = []
                for (let i = 0; panier[i]; i++) {
                    if (panier[i].idcable === idProduct) {
                        res[0] = panier[i]
                        produitAjouter.quantite = panier[i].quantite
                    }
                }
                if (res === undefined) {
                    produitAjouter.quantite += 1;
                    panier.push({ produitAjouter })
                } else {
                    var isInCart = false
                    for (let i = 0; panier[i]; i++) {
                        if (panier[i].idcable === idProduct) {
                            panier[i].quantite += 1
                            isInCart = true
                        }
                    }
                    if (isInCart === false) {
                        panier.push(produitAjouter)
                    }
                }
            }

        }
        localStorage.setItem("panier", JSON.stringify(panier))
    }
}


export async function RemoveProductToCart(idProduct) {
    if (!localStorage.getItem("panier")) {
        return
    } else {

        var panier = await JSON.parse(localStorage.getItem("panier"))
        for (let i = 0; panier[i]; i++) {
            if (panier[i].idcable === idProduct) {
                if (panier[i].quantite > 1) {
                    panier[i].quantite -= 1
                } else {
                    panier.splice(i, 1)
                }
            }
        }
        localStorage.setItem("panier", JSON.stringify(panier))
    }
}

export function RemoveCart() {
    localStorage.setItem("panier", "[]")
}

export async function ValiderPanier(id, panierToBack) {
    try {
        const getIdcmd = await axios.post("http://localhost:8800/commands/newcommand" + id)
        const getAllProd = await JSON.parse(localStorage.getItem("produits"))
        for (let j = 0; panierToBack[j]; j++) {
            var sendNewData = []
            for (let i = 0; getAllProd[i]; i++) {
                if (panierToBack[j].idcable === getAllProd[i].idcable) {
                    getAllProd[i].quantite -= panierToBack[j].quantite
                    sendNewData = getAllProd[i]
                }
            }
            console.log(sendNewData)
            await axios.post('http://localhost:8800/commands/sellprod' + getIdcmd.data, panierToBack[j])
            await axios.put('http://localhost:8800/product-cable/cable' + panierToBack[j].idcable, sendNewData)
        }
        localStorage.setItem("panier", [])

    } catch (err) {
        console.error("Erreur lors de l'envoi des données.")
    }
}