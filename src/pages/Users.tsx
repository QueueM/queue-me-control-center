import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash, Copy, FileText, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

const UsersPage = () => {
  const { toast } = useToast();
  const [rows, setRows] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2023-08-01",
      details: "Details about John Doe",
      subscription: "Pro",
      dateOfBirth: new Date('2000-01-01'),
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Editor",
      status: "Inactive",
      lastLogin: "2023-07-15",
      details: "Details about Jane Smith",
      subscription: "Basic",
      dateOfBirth: new Date('1995-05-10'),
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      role: "Viewer",
      status: "Active",
      lastLogin: "2023-08-05",
      details: "Details about Alice Johnson",
      subscription: "Free",
      dateOfBirth: new Date('1992-11-20'),
    },
    {
      id: 4,
      name: "Bob Williams",
      email: "bob.williams@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2023-08-03",
      details: "Details about Bob Williams",
      subscription: "Pro",
      dateOfBirth: new Date('1988-03-15'),
    },
    {
      id: 5,
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      role: "Editor",
      status: "Inactive",
      lastLogin: "2023-07-20",
      details: "Details about Charlie Brown",
      subscription: "Basic",
      dateOfBirth: new Date('1997-07-04'),
    },
    {
      id: 6,
      name: "Diana Miller",
      email: "diana.miller@example.com",
      role: "Viewer",
      status: "Active",
      lastLogin: "2023-08-07",
      details: "Details about Diana Miller",
      subscription: "Free",
      dateOfBirth: new Date('1990-09-22'),
    },
    {
      id: 7,
      name: "Ethan Davis",
      email: "ethan.davis@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2023-08-02",
      details: "Details about Ethan Davis",
      subscription: "Pro",
      dateOfBirth: new Date('1993-12-01'),
    },
    {
      id: 8,
      name: "Fiona Wilson",
      email: "fiona.wilson@example.com",
      role: "Editor",
      status: "Inactive",
      lastLogin: "2023-07-18",
      details: "Details about Fiona Wilson",
      subscription: "Basic",
      dateOfBirth: new Date('1996-02-29'),
    },
    {
      id: 9,
      name: "George Moore",
      email: "george.moore@example.com",
      role: "Viewer",
      status: "Active",
      lastLogin: "2023-08-06",
      details: "Details about George Moore",
      subscription: "Free",
      dateOfBirth: new Date('1985-06-18'),
    },
    {
      id: 10,
      name: "Hannah Taylor",
      email: "hannah.taylor@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2023-08-04",
      details: "Details about Hannah Taylor",
      subscription: "Pro",
      dateOfBirth: new Date('1999-04-08'),
    },
  ]);
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("");
	const [status, setStatus] = useState("");
	const [details, setDetails] = useState("");
	const [subscription, setSubscription] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date("2000-01-01"))

  const filteredRows = rows.filter(row => {
    const searchLower = search.toLowerCase();
    return (
      row.name.toLowerCase().includes(searchLower) ||
      row.email.toLowerCase().includes(searchLower) ||
      row.role.toLowerCase().includes(searchLower) ||
      row.status.toLowerCase().includes(searchLower) ||
      row.subscription.toLowerCase().includes(searchLower)
    );
  });

  const handleBulkAction = (action: string) => {
    // Convert selectedUsers to strings if they're numbers
    const userIds = selectedUsers.map(id => String(id));
    
    switch(action) {
      case 'delete':
        toast({
          title: `${selectedUsers.length} users deleted`,
          description: `Users ${userIds.join(', ')} have been removed.`
        });
        break;
      case 'suspend':
        toast({
          title: `${selectedUsers.length} users suspended`,
          description: `Users ${userIds.join(', ')} have been suspended.`
        });
        break;
      case 'activate':
        toast({
          title: `${selectedUsers.length} users activated`,
          description: `Users ${userIds.join(', ')} have been activated.`
        });
        break;
      default:
        toast({
          title: "No action selected",
          description: "Please select an action to perform on the selected users.",
          variant: "destructive",
        });
    }
    
    setSelectedUsers([]);
  };

  const selectUser = (userId: string) => {
    setSelectedUsers((prev) => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId) 
        : [...prev, userId]
    );
  };

  const AvatarComponent = () => {
    return (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    )
  }

  const BadgeComponent = ({ type }: { type: string }) => {
    let variant = "default";
    if (type === "Active") variant = "success";
    if (type === "Inactive") variant = "destructive";
    if (type === "Pending") variant = "warning";

    return (
      <Badge variant={variant}>
        {type}
      </Badge>
    )
  }

  const handleCreateUser = () => {
    if (!name || !email || !role || !status || !details || !subscription || !date) {
      toast({
        title: "Error creating user",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const newUser = {
      id: rows.length + 1,
      name,
      email,
      role,
      status,
      lastLogin: format(new Date(), "yyyy-MM-dd"),
      details,
      subscription,
      dateOfBirth: date,
    };

    setRows([...rows, newUser]);
    setOpen(false);

    toast({
      title: "User created",
      description: `${name} has been created.`,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="flex items-center space-x-2">
          <Input
            type="search"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-2">
                Bulk Actions <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleBulkAction('delete')}>Delete</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleBulkAction('suspend')}>Suspend</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleBulkAction('activate')}>Activate</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add User</DialogTitle>
                <DialogDescription>
                  Create a new user to add to the table.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Editor">Editor</SelectItem>
                      <SelectItem value="Viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subscription" className="text-right">
                    Subscription
                  </Label>
                  <Select value={subscription} onValueChange={setSubscription}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a subscription" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pro">Pro</SelectItem>
                      <SelectItem value="Basic">Basic</SelectItem>
                      <SelectItem value="Free">Free</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="details" className="text-right">
                    Details
                  </Label>
                  <Textarea id="details" value={details} onChange={(e) => setDetails(e.target.value)} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date of Birth
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        {date ? format(date, "PPP") : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center" side="bottom">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) =>
                          date > new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleCreateUser}>Create User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mt-4">
        <Table>
          <TableCaption>A list of your registered users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedUsers.length === rows.length}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedUsers(rows.map(user => String(user.id)));
                    } else {
                      setSelectedUsers([]);
                    }
                  }}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRows.map(user => (
              <tr key={String(user.id)}>
                <td className="px-4 py-3">
                  <Checkbox 
                    checked={selectedUsers.includes(String(user.id))} 
                    onCheckedChange={() => selectUser(String(user.id))}
                  />
                </td>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <AvatarComponent />
                    <span>{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <BadgeComponent type={user.status} />
                </TableCell>
                <TableCell>{user.lastLogin}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" /> <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" /> <span>Copy</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" /> <span>View details</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash className="mr-2 h-4 w-4" /> <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersPage;
