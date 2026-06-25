import { Router } from 'express';
import { summarizeNotice, studyBuddy, dailyBriefing } from '../controllers/ai.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/summarize-notice', verifyToken, summarizeNotice);
router.post('/study-buddy', verifyToken, studyBuddy);
router.post('/daily-briefing', verifyToken, dailyBriefing);

export default router;
