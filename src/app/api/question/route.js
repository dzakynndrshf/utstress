import axios from 'axios';

const response = await axios.post('https://api.openai.com/v1/completions', {
  model: 'gpt-4', // atau 'gpt-3.5-turbo'
  prompt: 'Hello, how can I help you?',
  max_tokens: 150,
  temperature: 0.7,
}, {
  headers: {
    'Authorization': `k-proj-TmicZiynK0gnlCAcHV24hDgGxCZrOdlMsjRhpGoAzRwpVaWpXXHd49N6P6x8x2l0Izox2HLzEuT3BlbkFJL6W_kztAsi7akeX38QNgRbIsDUIxXh5HcbYOyJXkoemUBP0Ik3ImITIQeaBMlRbtcSsXoiPHgA`, // Ganti dengan API key yang kamu ambil
    'Content-Type': 'application/json',
  }
});
