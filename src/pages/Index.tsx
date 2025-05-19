
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, LayoutDashboard, Users, Store, CreditCard, Settings } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      title: 'Dashboard',
      description: 'View key metrics and performance indicators',
      icon: LayoutDashboard,
      path: '/dashboard'
    },
    {
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      icon: Users,
      path: '/users'
    },
    {
      title: 'Shop Management',
      description: 'Oversee registered businesses on the platform',
      icon: Store,
      path: '/shops'
    },
    {
      title: 'Payments',
      description: 'Track payments and manage financial transactions',
      icon: CreditCard,
      path: '/payments'
    },
    {
      title: 'Settings',
      description: 'Configure system and account preferences',
      icon: Settings,
      path: '/settings'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background/95 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <div className="flex justify-center mb-6">
          <img src="/logo.svg" alt="QueueMe Logo" className="h-16" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Welcome to QueueMe Admin Panel</h1>
        <p className="text-xl text-muted-foreground">
          Manage your platform, users, and businesses with our comprehensive admin tools.
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="lg">
              <a href="/dashboard" className="flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5" />
                <span>Go to Dashboard</span>
              </a>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild variant="outline" size="lg">
              <a href="/login" className="flex items-center gap-2">
                <span>Sign Out</span>
              </a>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="h-full"
            >
              <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate(feature.path)}>
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground flex-1">{feature.description}</p>
                  <div className="flex justify-end mt-4">
                    <ArrowRight className="h-5 w-5 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
