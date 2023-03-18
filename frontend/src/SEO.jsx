import React from 'react';
import {Helmet} from 'react-helmet-async';

export default function SEO({title, description, name, type, robots, keywords, canonical, author, publish}) {
    let location = window.location.href
    return (
        <Helmet>
            <title>{title}</title>
            { /* standard metadata tags */}
            <meta name='description' content={description}/>
            <meta name="keywords" content={keywords ? keywords : "flower, flower shop , buy flower"}/>
            <meta name="author" content={author}/>
            <meta name="publish" content={publish}/>
            { /* End standard metadata tags */}
            { /* Facebook tags */}
            <meta property="og:type" content={type}/>
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
            { /* End Facebook tags */}
            { /* Twitter tags */}
            <meta name="twitter:creator" content={name}/>
            <meta name="twitter:card" content={type}/>
            <meta name="twitter:title" content={title}/>
            <meta name="twitter:description" content={description}/>
            { /* End Twitter tags */}
            { /* robots tags */}
            <meta name="robots" content={robots ? robots : "index, follow"}/>
            { /* End robots tags */}
            <link rel="canonical" href={canonical ? canonical : location}/>
        </Helmet>
    )
}