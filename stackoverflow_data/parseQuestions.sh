jq -r '.items[] | [
  .owner.user_id,
  .is_answered,
  .view_count,
  .accepted_answer_id,
  .answer_count,
  .score,
  .last_activity_date,
  .creation_date,
  .last_edit_date,
  .question_id,
  .content_license,
  .link,
  .title
] | @csv' questions.json > questions.csv