import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { MoreVertical } from 'lucide-react';
import { useState } from 'react'
import AddContact from './AddContact'

const Header = () => {
    const [showAddContact, setShowAddContact] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="p-4 bg-white flex justify-between items-center">
            <Avatar>
                <AvatarImage src="/api/placeholder/50/50" />
                <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-md hover:bg-gray-200"
                >
                    <MoreVertical className="text-gray-600" />
                </button>
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border border-gray-200 z-20">
                        <ul className="py-2">
                            <li>
                                <button
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={() => {
                                        setIsOpen(false);
                                        setShowAddContact(true);
                                    }}
                                >
                                    Add Contact
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
                {showAddContact && <AddContact onClose={() => setShowAddContact(false)} />}
            </div>
        </div>
    )
}

export default Header
