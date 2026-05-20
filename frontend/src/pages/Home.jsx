import React from "react";
import Button from '../components/Button';
import { PlusCircleIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

const Home = ({user, error}) => {
    return (
        <div>
            <div>
                {error && <p className="text-red-500">{error}</p>}
                {user ? (
                    <div>
                        <h2 className="text-2xl">Welcome, {user.name}!</h2>
                    </div>
                ) : (
                    <h2 className="text-2xl">Please log in or register.</h2>
                )}
            </div>
        </div>
    )
}

export default Home