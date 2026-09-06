export type Result = {
overall_score: number;
skill_score: number;
experience_score: number;
semantic_score: number;

jd_experience_years: number;
cv_experience_years: number;

matched_skills: string[];
missing_skills: string[];

ai: {
summary: string;
strengths: string[];
missing_skills: string[];
recommendations: string[];
interview_questions: string[];
};
};
