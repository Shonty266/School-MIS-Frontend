import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteModal = ({ open, setOpen, onConfirm, itemCount = 1 }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Delete {itemCount > 1 ? `${itemCount} items` : "this item"}?
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500 mb-4">
          Are you sure you want to delete{" "}
          {itemCount > 1 ? "these items" : "this item"}? This action cannot be
          undone.
        </p>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)} className="cursor-pointer">
            
            Cancel
          </Button>
          <Button
          className="cursor-pointer bg-red-500 hover:bg-red-600"
            variant="destructive"
            onClick={() => {
              setOpen(false);
              onConfirm();
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
