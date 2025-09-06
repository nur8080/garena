'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Event } from '@/lib/definitions';
import Image from 'next/image';

interface EventModalProps {
  event: Event;
  onClose: () => void;
}

export default function EventModal({ event, onClose }: EventModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="p-2 sm:p-4 max-w-2xl">
        <DialogHeader>
            <DialogTitle className="sr-only">Promotional Event</DialogTitle>
        </DialogHeader>
        <div className="relative aspect-video">
            <Image src={event.imageUrl} alt="Event" layout="fill" className="object-contain rounded-md" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
