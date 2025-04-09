import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import { ref, push, set } from 'firebase/database';
import { database } from "./firebase";

export function Cart() {
    const { cartItems, removeFromCart } = useContext(CartContext);

    // State to handle user inputs
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(false);

    // Function to send data to Firebase Realtime Database
    const sendToFirebase = async () => {
        if (!name || !address) {
            alert("Please provide both your name and address.");
            return;
        }

        try {
            const cartRef = ref(database, "cartItems"); // Reference to the "cartItems" collection
            await Promise.all(
                cartItems.map((item) => {
                    const newRef = push(cartRef); // Create a new unique reference for each item
                    return set(newRef, {
                        ...item,
                        name: name,
                        address: address,
                        timestamp: Date.now() // Add timestamp (current time in milliseconds)
                    });
                })
            );
            alert("Data sent to Firebase successfully!");
        } catch (error) {
            console.error("Error sending data to Firebase:", error);
            alert("Failed to send data to Firebase.");
        }
    };

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="cart-items">
                    {cartItems.map((item) => (
                        <div className="cart-item" key={item.id}>
                            <img src={item.image} alt={item.title} className="cart-img" />
                            <div className="cart-details">
                                <h3>{item.title}</h3>
                                <p>{item.disc}</p>
                            </div>
                            <button
                                className="remove-btn"
                                onClick={() => removeFromCart(item.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {!isFormVisible ? (
                <button className="send-btn" onClick={() => setIsFormVisible(true)}>
                    Proceed to Checkout
                </button>
            ) : (
                <div className="checkout-form">
                    <h2>Enter Your Details</h2>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-field"
                    />
                    <textarea
                        placeholder="Your Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="input-field"
                    />
                    <button className="send-btn" onClick={sendToFirebase}>
                        Submit & Send to Firebase
                    </button>
                </div>
            )}

            <Link to="/" className="back-btn">Continue Shopping</Link>
        </div>
    );
}