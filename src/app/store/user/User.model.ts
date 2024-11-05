export interface UserModel {           
    username: string;            
    email: string; 
    password: string, 
    name?: string,              
    phone?: number;          
    emailVerified?: boolean;      
    googleId?: string;            
    photoUrl?: string;      
}

export interface returnUserModeel extends UserModel {
    objectId: string;             
    username: string;            
    email: string; 
    password: string, 
    name?: string,              
    phone?: number;          
    emailVerified?: boolean;      
    googleId?: string;            
    photoUrl?: string;
}