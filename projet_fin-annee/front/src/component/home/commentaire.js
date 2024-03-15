import React, { useEffect, useState } from 'react'
import './commentaire.css'

export const Commentaire = () => {
    const [comments, setComments] = useState()
    useEffect(() => {
        const getData = async () => {
            const res = await fetch("http://localhost:8800/comments/best-com", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!res.ok) {
                console.log("Couldn't fetch data")
            }
            else {
                const getRes = await res.json()
                // console.log(getRes)
                if (getRes[0]) {
                    setComments(getRes)
                    return
                }
            }
        }
        const interval = setInterval(getData, 3000)
        return () => clearInterval(interval)
    }, [])
    // console.log(comments)
    return (
        <div className="all-comments">
            {comments ? comments.map(comment => (
                <div className="comment" key={comment.idcomments}>
                    <h5>{comment.prenom} : {comment.note}/10</h5>
                    <p>{comment.message}</p>
                </div>
            )) : ""}
        </div>
    )
}
