
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { motion } from 'framer-motion';
import { MessageSquare, Send, User, Clock, Phone, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: string;
  isAdmin: boolean;
}

const mockTickets = [
  { 
    id: 'TKT-1001', 
    user: 'John Smith', 
    subject: 'Payment not processing',
    status: 'open',
    priority: 'high',
    created: '2023-05-10T10:30:00',
    lastUpdated: '2023-05-10T14:22:00'
  },
  { 
    id: 'TKT-1002', 
    user: 'Emily Watson', 
    subject: 'Cannot access subscription settings',
    status: 'open',
    priority: 'medium',
    created: '2023-05-09T16:45:00',
    lastUpdated: '2023-05-10T09:15:00'
  },
  { 
    id: 'TKT-1003', 
    user: 'Michael Brown', 
    subject: 'Shop verification issue',
    status: 'closed',
    priority: 'low',
    created: '2023-05-08T11:20:00',
    lastUpdated: '2023-05-09T13:45:00'
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    user: 'John Smith',
    content: "Hi, I'm having issues with the payment system. When I try to process a payment, it keeps showing an error.",
    timestamp: '2023-05-10T10:30:00',
    isAdmin: false
  },
  {
    id: '2',
    user: 'Support Team',
    content: "Hello John, I'm sorry to hear about the payment issue. Could you please tell me what specific error message you're seeing?",
    timestamp: '2023-05-10T10:35:00',
    isAdmin: true
  },
  {
    id: '3',
    user: 'John Smith',
    content: "It says 'Transaction declined: insufficient funds'. But I've checked with my bank and there are sufficient funds in my account.",
    timestamp: '2023-05-10T10:40:00',
    isAdmin: false
  },
  {
    id: '4',
    user: 'Support Team',
    content: "Thanks for that information. Let me check our payment logs to see what might be happening. I'll get back to you as soon as possible.",
    timestamp: '2023-05-10T10:45:00',
    isAdmin: true
  },
  {
    id: '5',
    user: 'Support Team',
    content: "I've looked into the issue and it appears there might be an authorization hold from a previous transaction. These typically clear within 24-48 hours. Would you like me to try processing the payment manually from our end?",
    timestamp: '2023-05-10T14:22:00',
    isAdmin: true
  }
];

const SupportPage = () => {
  const { toast } = useToast();
  const [selectedTicket, setSelectedTicket] = useState(mockTickets[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  
  const handleSelectTicket = (ticket: typeof mockTickets[0]) => {
    setSelectedTicket(ticket);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMessageObj: Message = {
      id: `${messages.length + 1}`,
      user: 'Support Team',
      content: newMessage,
      timestamp: new Date().toISOString(),
      isAdmin: true
    };
    
    setMessages([...messages, newMessageObj]);
    setNewMessage('');
    
    toast({
      title: "Message Sent",
      description: "Your response has been sent to the customer.",
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row gap-4 items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Support</h1>
          <p className="text-muted-foreground">Manage support tickets and chat with customers.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Tickets</h2>
            <div className="flex items-center gap-1 text-sm bg-primary/10 text-primary rounded-full px-3 py-1">
              <span className="inline-block h-2 w-2 rounded-full bg-primary"></span>
              <span>3 Active</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <Input placeholder="Search tickets..." className="w-full" />
            
            <motion.div variants={container} initial="hidden" animate="show">
              {mockTickets.map((ticket, index) => (
                <motion.div 
                  key={ticket.id}
                  variants={item}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleSelectTicket(ticket)}
                  className={`cursor-pointer rounded-lg border p-4 mb-3 hover:border-primary/50 transition-colors ${selectedTicket.id === ticket.id ? 'border-primary bg-primary/5' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{ticket.subject}</h3>
                    <span className={`text-xs rounded-full px-2 py-1 ${
                      ticket.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <User className="h-3 w-3" />
                    <span>{ticket.user}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Updated {formatDate(ticket.lastUpdated)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <div className={`h-2 w-2 rounded-full ${
                      ticket.priority === 'high' ? 'bg-red-500' : 
                      ticket.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                    }`}></div>
                    <span className="text-xs capitalize">{ticket.priority} priority</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="h-full">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{selectedTicket.subject}</CardTitle>
                  <CardDescription>Ticket ID: {selectedTicket.id}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Phone className="mr-2 h-4 w-4" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Customer:</span> 
                  <span className="font-medium">{selectedTicket.user}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Created:</span> 
                  <span className="font-medium">{formatDate(selectedTicket.created)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Status:</span> 
                  <span className={`capitalize ${
                    selectedTicket.status === 'open' ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {selectedTicket.status}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Priority:</span> 
                  <span className="capitalize">{selectedTicket.priority}</span>
                </div>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
              <div className="h-[400px] overflow-y-auto space-y-4 mb-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isAdmin ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-4 rounded-lg ${
                      message.isAdmin 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`font-medium text-sm ${message.isAdmin ? '' : 'text-muted-foreground'}`}>
                          {message.user}
                        </div>
                        <div className="text-xs opacity-70">
                          {formatDate(message.timestamp)}
                        </div>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Textarea
                  placeholder="Type your response..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={handleSendMessage}>
                    <Send className="mr-2 h-4 w-4" />
                    Send
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SupportPage;
