class AddUserIdToTestQuestions < ActiveRecord::Migration[7.0]
  def change
    add_reference :test_questions, :user, null: false, foreign_key: true, default: User.first&.id
  end
end
