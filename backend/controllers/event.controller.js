import Event from "../models/event.model.js";
import { errorHandler } from "../Utils/error.js";


// Create an event
export const createEvent = async (req, res, next) => {
  const { title, description, date, location } = req.body;

  try {
    const newEvent = new Event({
      title,
      description,
      date,
      location,
      organizer: req.user.id,
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", newEvent });
  } catch (err) {
    next(err);
  }
};


export const getMyEvents = async (req, res, next) => {
  try {
    // Check if user is authenticated
    console.log("[DEBUG] User object:", req.user); // Log the entire user object
    if (!req.user) {
      console.error("[ERROR] User not authenticated");
      return next(errorHandler(401, "User not authenticated"));
    }

    // Log the user ID from the token
    console.log("[DEBUG] Searching events for user ID:", req.user.id);

    // Query the database
    const events = await Event.find({ organizer: req.user.id });
    console.log("[DEBUG] Found events:", events);

    res.status(200).json({ events });
  } catch (err) {
    // Log the full error
    console.error("[ERROR] Database query failed:", err);
    next(errorHandler(500, "Failed to fetch events", err.message));
  }
};


// Get all events
export const getAllEvents = async (req, res, next) => {
  try {
    const { status, category, page = 1, limit = 10 } = req.query;
    
    // Build filter query
    const filter = {};
    
    // Status filter
    if (status && status !== 'All') {
      const validStatuses = ['Upcoming', 'Past'];
      if (!validStatuses.includes(status)) {
        return next(errorHandler(400, 'Invalid status value'));
      }
      
      // Calculate status filter
      const now = new Date();
      if (status === 'Upcoming') {
        filter.date = { $gte: now };
      } else {
        filter.date = { $lt: now };
      }
    }

    // Category filter
    if (category && category !== 'All') {
      filter.category = category;
    }

    // Get paginated results
    const events = await Event.find(filter)
      .populate('organizer', 'name email')
      .sort({ date: 1 }) // Sort by date ascending
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalEvents = await Event.countDocuments(filter);

    res.status(200).json({
      success: true,
      events,
      totalEvents,
      totalPages: Math.ceil(totalEvents / limit),
      currentPage: Number(page)
    });
    
  } catch (err) {
    next(err);
  }
};

// Get event by ID
export const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate("organizer", "name email");
    if (!event) return next(errorHandler(404, "Event not found"));
    res.status(200).json(event);
  } catch (err) {
    next(err);
  }
};

// Update event
export const updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return next(errorHandler(404, "Event not found"));

    if (event.organizer.toString() !== req.user.id) {
      return next(errorHandler(403, "You can only update your own events"));
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedEvent);
  } catch (err) {
    next(err);
  }
};

// Delete event
export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return next(errorHandler(404, "Event not found"));

    if (event.organizer.toString() !== req.user.id) {
      return next(errorHandler(403, "You can only delete your own events"));
    }

    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    next(err);
  }
};
