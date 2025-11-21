import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Quote from '../models/Quote';

export const createQuote = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const quoteData = req.body;
    const quote = new Quote(quoteData);
    await quote.save();

    res.status(201).json({
      success: true,
      message: 'Quote request submitted successfully! We will get back to you soon.',
      data: quote,
    });
  } catch (error: any) {
    console.error('Error creating quote:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit quote request',
      error: error.message,
    });
  }
};

export const getAllQuotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: quotes.length,
      data: quotes,
    });
  } catch (error: any) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quotes',
      error: error.message,
    });
  }
};

export const getQuoteById = async (req: Request, res: Response): Promise<void> => {
  try {
    const quote = await Quote.findById(req.params.id);
    
    if (!quote) {
      res.status(404).json({
        success: false,
        message: 'Quote not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: quote,
    });
  } catch (error: any) {
    console.error('Error fetching quote:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quote',
      error: error.message,
    });
  }
};

export const updateQuoteStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!quote) {
      res.status(404).json({
        success: false,
        message: 'Quote not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Quote status updated successfully',
      data: quote,
    });
  } catch (error: any) {
    console.error('Error updating quote:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update quote',
      error: error.message,
    });
  }
};

export const deleteQuote = async (req: Request, res: Response): Promise<void> => {
  try {
    const quote = await Quote.findByIdAndDelete(req.params.id);

    if (!quote) {
      res.status(404).json({
        success: false,
        message: 'Quote not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Quote deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting quote:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete quote',
      error: error.message,
    });
  }
};
