class User < ApplicationRecord
  has_many :test_questions, dependent: :destroy
  enum learner_type: { fast: 'fast', slow: 'slow' }
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable, :confirmable

      
  def age
    if dob.present?
      now = Time.now.utc.to_date
      dob = self.dob.to_date
      age = now.year - dob.year - ((now.month > dob.month || (now.month == dob.month && now.day >= dob.day)) ? 0 : 1)
      age >= 0 ? age : 0
    else
      0
    end
  end 
  

  def admin?
    role == 'admin'
  end

  def name
    "#{first_name} #{last_name}".strip
  end
  
end
