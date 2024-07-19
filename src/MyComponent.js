import { useState, useEffect, lazy } from "react"

const useFetchProjectScansByUser = () => {
    const [X, setX] = useState(0)
    const [Y, setY] = useState(0)
    // make new state variable to control useEffect firing
    const [update, setUpdate] = useState(0)
    useEffect(() => {
        console.log("I will fire every time the update var changes")
        console.log("Instead of only on mount")
    }, [update]) // pass the state var to dep array
    // create a function that will update state reliably every call
    const updateFunc = () => {
        console.log("hy")
        setUpdate((v) => v + 1)
        setX(10 * Math.random())
        setY(10 * Math.random())
    }
    // pass it back to the hook consumer
    return [X, Y, updateFunc]
}

const MyComponent = () => {
    // now we have an update function to call from the consumer
    // const [X, Y, update] = useFetchProjectScansByUser('user')
    const [X, setX] = useState(0)
    const [Y, setY] = useState(0)
    // const [update, setUpdate] = useState(0)

    useEffect(() => {
        // call the update function every 3 seconds, which will re-run the hook useEffect
        const id = setInterval(() => {
            console.log("hy")
            // setUpdate((v) => v + 1)
            setX(10 * Math.random())
            setY(10 * Math.random())
        }, 1000)

        return () => clearInterval(id)
    })
    // if a hook state updates, this component which consumes that hook will re-render
    // thus X and Y will be updated.
    return <div>{X} <div>{Y}</div></div>
}
export default MyComponent