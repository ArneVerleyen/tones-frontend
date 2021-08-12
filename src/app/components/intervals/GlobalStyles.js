import {createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle`

*{
    background: ${({theme})=> theme.body};
    color: #FFB94E;
    font-family: baskerville-urw, serif;
    transition: all 0.1s linear;
    touch-action:manipulation;
}
.intervals-container{
    display: flex;
    align-items: center;
    flex-direction: column;
    .played-notes{
        display: flex;
        justify-content: space-around;
        margin: 4px 0;
        div{
            background-color: #470047;
            width: 42vw;
            margin: 0 5px;
        }
        .played-note{
            cursor: pointer;
            margin: 0 2px;
            width: 47vw;
            padding: 1.2vh 0vw;
            text-align: center;
            background-color: #470047;
            border-radius: 24px;
            h3{
                background-color: #470047;
                font-size: 24px;
                width: 42vw;
                margin: 0 5px;
                // color: white;
                font-weight: 300;
            }
            img{
          
                background-color: #470047;
            }
        }
    }

    .play {
        cursor: pointer;
        border: none;
        text-decoration: none;
        width: 85vw;
        margin: 0 2px;
        padding: 20px;
        background-color: #470047;
        display: flex;
        justify-content: center;
        border-radius: 24px;
        p{
            font-size: 24px;
            // color: white;
            font-weight: 300;
            margin-right: 20px;
            background-color: #470047;
        }
        img{
            background-color: #470047;
        }
    }

    .answer-container {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 4px;
        width: 100vw;
        div{
            cursor: pointer;
            margin: 2px 2px;
            text-align: center;
            height: 12vh;
            width: 47vw;
            background-color: #470047;
            border-radius: 24px;
            p{
                margin: 4vh 0 0 12px;
                background-color: #470047;
                font-size: 18px;
                // color: white;
                font-weight: 300;
                margin-right: 20px;
            }
        }
    }

    .score {
        text-align: center;
    }

    .intervals-footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 80px;

        .icons-container {
            display: flex;
            align-items: center;
            justify-content: center;
            svg {
                cursor: pointer;
                margin: 20px 50px;
            }
        }

        .end-session {
            cursor: pointer;
            text-align: center;
            background-color: #470047;
            border-radius: 24px;
            padding: 20px;
            p {
                font-size: 24px;
                background-color: #470047;
            }
        }
    }
}
}

@media only screen and (min-width: 600px) {
    .intervals-container{
        display: flex;
        align-items: center;
        flex-direction: column;
        .played-notes{
            display: flex;
            justify-content: space-around;
            margin: 4px 0;
            div{
                background-color: #470047;
                width: 260px;
                margin: 0 5px;
            }
            .played-note{
                cursor: pointer;
                margin: 0 2px;
                width: 280px;
                padding: 1.2vh 0vw;
                text-align: center;
                background-color: #470047;
                border-radius: 24px;
                h3{
                    background-color: #470047;
                    font-size: 24px;
                    width: 260px;
                    margin: 0 5px;
                    // color: white;
                    font-weight: 300;
                }
                img{
              
                    background-color: #470047;
                }
            }
        }
    
        .play {
            cursor: pointer;
            border: none;
            margin: 0 2px;
            text-decoration: none;
            width: 525px;
            padding: 20px;
            background-color: #470047;
            display: flex;
            justify-content: center;
            border-radius: 24px;
            p{
                font-size: 24px;
                // color: white;
                font-weight: 300;
                margin-right: 20px;
                background-color: #470047;
            }
            img{
                background-color: #470047;
            }
        }
    
        .answer-container {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            width: 565px;
            margin-top: 4px;
    
            div {
                cursor: pointer;
                margin: 2px 2px;
                text-align: center;
                height: 12vh;
                width: 278px;
                background-color: #470047;
                border-radius: 24px;
                p{
                    margin: 4vh 0 0 12px;
                    background-color: #470047;
                    font-size: 18px;
                    // color: white;
                    font-weight: 300;
                    margin-right: 20px;
                }
            }
        }
        .score {
            text-align: center;
        }
    }    
    
}
`;