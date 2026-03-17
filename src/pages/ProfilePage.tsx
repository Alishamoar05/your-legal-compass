import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin } from "lucide-react";

const ProfilePage = () => {
  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-heading text-3xl font-semibold text-foreground mb-8">Profile</h1>

        <div className="bg-card rounded-2xl p-8 card-shadow">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-semibold text-foreground">John Doe</h2>
              <p className="text-sm text-muted-foreground">Member since 2024</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: "john@example.com" },
              { icon: Phone, label: "Phone", value: "+91 98765 43210" },
              { icon: MapPin, label: "Location", value: "Mumbai, India" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <item.icon className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm text-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
