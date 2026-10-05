import React, { useState } from 'react';
import { UPCOMING_EVENTS } from '../data/books';
import { BookClubEvent } from '../types';
import { Calendar, Clock, MapPin, Check, Ticket, Coffee, BookOpen, Users } from 'lucide-react';

export const EventsAndReadingRoom: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<BookClubEvent | null>(null);
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeEmail, setAttendeeEmail] = useState('');
  const [confirmedReservation, setConfirmedReservation] = useState<{ event: BookClubEvent; name: string; ticketId: string } | null>(null);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);

  const handleOpenRsvp = (event: BookClubEvent) => {
    setSelectedEvent(event);
    setIsRsvpOpen(true);
  };

  const handleConfirmRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;
    setConfirmedReservation({
      event: selectedEvent,
      name: attendeeName || 'Literary Guest',
      ticketId: `SALON-${Math.floor(1000 + Math.random() * 9000)}`
    });
  };

  return (
    <section id="events" className="py-16 sm:py-24 bg-[#F8F5EE] border-b border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-mono text-[#8C2D19] font-semibold block mb-1">
              Readings, Salons & Masterclasses
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#1C1917] tracking-tight">
              Upcoming Literary Salons
            </h2>
          </div>
          <p className="font-reading text-sm text-[#57534E] max-w-md">
            Held by candlelight in our Upper Reading Room. Limited to twenty seated guests per gathering to preserve intimate dialogue.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {UPCOMING_EVENTS.map((event) => (
            <div 
              key={event.id}
              className="bg-[#FBF9F5] border border-[#E2DBD0] rounded-sm p-6 flex flex-col justify-between hover:border-[#C5A880] transition-colors shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#78716C] mb-3">
                  <div className="flex items-center gap-1.5 font-medium text-[#8C2D19]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{event.date}</span>
                  </div>
                  <span className="font-mono text-[11px] text-amber-900 bg-amber-50 px-2 py-0.5 rounded-sm">
                    {event.spotsLeft} seats remaining
                  </span>
                </div>

                <h3 className="font-serif-display text-lg font-bold text-[#1C1917] leading-snug mb-2">
                  {event.title}
                </h3>

                <p className="text-xs text-[#57534E] font-reading leading-relaxed mb-4">
                  {event.description}
                </p>

                <div className="space-y-1.5 text-xs text-[#78716C] pt-3 border-t border-[#F0EBE1]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#8C2D19]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#8C2D19]" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#8C2D19]" />
                    <span>Featuring: {event.author} (Moderated by {event.moderator})</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F0EBE1]">
                <button
                  onClick={() => handleOpenRsvp(event)}
                  className="w-full py-2.5 px-4 text-xs font-semibold tracking-wider uppercase text-white bg-[#1C1917] hover:bg-[#2C2724] transition-colors rounded-sm flex items-center justify-center gap-2"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Reserve Complimentary Seat</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Reading Room & Coffee Bar Section */}
        <div id="reading-room" className="bg-[#FAF7F0] border border-[#E2DBD0] rounded-sm p-8 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs uppercase tracking-widest font-mono text-[#8C2D19] font-semibold block">
                The Physical Sanctuary
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                The Bloomsbury Reading Rooms & Hearth
              </h3>
              <p className="font-reading text-sm text-[#57534E] leading-relaxed">
                Step off the rain-slicked pavement of Great Russell Street and into our three-story sanctuary. 
                Oak library desks, green banker's lamps, a working wood hearth, and thousands of open volumes. 
                Complimentary fountain pen ink and blotting paper at every writing carrel.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3 text-xs">
                <div className="p-3 bg-white border border-[#E7E2D8] rounded-sm">
                  <span className="font-mono text-[#78716C] block text-[10px] uppercase">Hours</span>
                  <strong className="text-[#1C1917] block mt-0.5">Mon–Sat: 9am – 9pm</strong>
                  <span className="text-[#78716C] text-[11px]">Sunday: 10am – 6pm</span>
                </div>
                <div className="p-3 bg-white border border-[#E7E2D8] rounded-sm">
                  <span className="font-mono text-[#78716C] block text-[10px] uppercase">Address</span>
                  <strong className="text-[#1C1917] block mt-0.5">48 Great Russell St</strong>
                  <span className="text-[#78716C] text-[11px]">Bloomsbury, London WC1</span>
                </div>
                <div className="p-3 bg-white border border-[#E7E2D8] rounded-sm col-span-2 sm:col-span-1">
                  <span className="font-mono text-[#78716C] block text-[10px] uppercase">Atmosphere</span>
                  <strong className="text-[#1C1917] block mt-0.5">Device-Quiet Zone</strong>
                  <span className="text-[#78716C] text-[11px]">Silent reading guaranteed</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#F3ECE0] p-6 border border-[#E2DBD0] rounded-sm">
              <div className="flex items-center gap-2 mb-3">
                <Coffee className="w-4 h-4 text-[#8C2D19]" />
                <h4 className="font-serif-display text-base font-semibold text-[#1C1917]">
                  The Bindery Coffee Bar
                </h4>
              </div>
              <p className="font-reading text-xs text-[#57534E] mb-4 leading-relaxed">
                Single-origin pour-overs and monastery herbal teas served in ceramic stoneware thrown by local potters.
              </p>

              <ul className="space-y-2 text-xs divide-y divide-[#E6DECة] divide-[#E2D8C6]">
                <li className="flex justify-between pt-1.5 text-[#44403C]">
                  <span>Yirgacheffe Pour-Over (Jasmine & Bergamot)</span>
                  <span className="font-mono font-medium">$4.80</span>
                </li>
                <li className="flex justify-between pt-1.5 text-[#44403C]">
                  <span>Monastic Verbena & Linden Flower Infusion</span>
                  <span className="font-mono font-medium">$4.20</span>
                </li>
                <li className="flex justify-between pt-1.5 text-[#44403C]">
                  <span>Cardamom Rye Shortbread (Fresh from Oven)</span>
                  <span className="font-mono font-medium">$3.50</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* RSVP Modal */}
      {isRsvpOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#FBF9F5] border border-[#D5CDBD] rounded-sm shadow-2xl p-6 sm:p-7">
            {!confirmedReservation ? (
              <form onSubmit={handleConfirmRsvp} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E2D8]">
                  <span className="text-xs uppercase tracking-widest font-mono text-[#8C2D19]">Salon Pass Reservation</span>
                  <button 
                    type="button" 
                    onClick={() => setIsRsvpOpen(false)}
                    className="text-[#78716C] hover:text-[#1C1917]"
                  >
                    ✕
                  </button>
                </div>

                <div>
                  <h3 className="font-serif-display text-lg font-bold text-[#1C1917]">
                    {selectedEvent.title}
                  </h3>
                  <p className="text-xs text-[#78716C] mt-0.5">
                    {selectedEvent.date} · {selectedEvent.time}
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[#57534E] mb-1 font-medium">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Margaret Smith"
                      value={attendeeName}
                      onChange={(e) => setAttendeeName(e.target.value)}
                      className="w-full p-2 bg-white border border-[#D5CDBD] rounded-sm focus:outline-none focus:border-[#8C2D19]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#57534E] mb-1 font-medium">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. margaret@example.com"
                      value={attendeeEmail}
                      onChange={(e) => setAttendeeEmail(e.target.value)}
                      className="w-full p-2 bg-white border border-[#D5CDBD] rounded-sm focus:outline-none focus:border-[#8C2D19]"
                    />
                  </div>
                </div>

                <div className="p-3 bg-[#F4EFE6] border border-[#E2DBD0] rounded-sm text-[11px] text-[#57534E] font-reading">
                  Admission is complimentary. Reserved seats are held until 10 minutes prior to salon commencement.
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 text-xs font-semibold tracking-wider uppercase text-white bg-[#1C1917] hover:bg-[#2C2724] rounded-sm"
                  >
                    Confirm My Attendance
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsRsvpOpen(false)}
                    className="py-2.5 px-4 text-xs text-[#57534E] hover:text-[#1C1917]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center space-y-4 py-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif-display text-xl font-bold text-[#1C1917]">
                    Seat Reserved, {confirmedReservation.name}
                  </h3>
                  <p className="text-xs text-[#57534E] mt-1 font-reading">
                    We look forward to welcoming you to the Upper Reading Room.
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#E7E2D8] rounded-sm text-left text-xs space-y-2">
                  <div className="flex justify-between border-b border-[#F0EBE1] pb-1.5">
                    <span className="text-[#78716C]">Pass Identifier:</span>
                    <span className="font-mono font-bold text-[#8C2D19]">{confirmedReservation.ticketId}</span>
                  </div>
                  <div>
                    <span className="text-[#78716C] block">Gathering:</span>
                    <span className="font-medium text-[#1C1917]">{confirmedReservation.event.title}</span>
                  </div>
                  <div>
                    <span className="text-[#78716C] block">Time & Place:</span>
                    <span className="text-[#57534E]">{confirmedReservation.event.date} at {confirmedReservation.event.time}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsRsvpOpen(false);
                    setConfirmedReservation(null);
                    setAttendeeName('');
                    setAttendeeEmail('');
                  }}
                  className="w-full py-2 px-4 text-xs font-medium text-white bg-[#1C1917] hover:bg-[#2C2724] rounded-sm"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
