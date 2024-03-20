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
            var getQuantity = 0
            for (let i = 0; produitsParse[i]; i++) {
                if (produitsParse[i].idcable === idProduct) {
                    produitAjouter = produitsParse[i]
                    produitAjouter.quantite = 1
                    getQuantity = produitsParse[i].quantite
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
                    produitAjouter.quantite = 1;
                    panier.push({ produitAjouter })
                    console.log(panier)
                } else {
                    for (let i = 0; panier[i]; i++) {
                        if (panier[i].idcable === idProduct && getQuantity > panier[i].quantite) {
                            panier[i].quantite += 1
                        }
                    }
                    console.log(panier)
                }
            }
            localStorage.setItem("panier", JSON.stringify(panier))
        }
    }
}
