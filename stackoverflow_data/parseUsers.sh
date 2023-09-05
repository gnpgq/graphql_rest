jq -r '.items[] | [
  .account_id,
  .is_employee,
  .reputation,
  .creation_date,
  .user_type,
  .user_id,
  .accept_rate,
  .location,
  .website_url,
  .link,
  .profile_image,
  .display_name
] | @csv' users.json > users.csv