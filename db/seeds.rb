# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ActiveRecord::Base.transaction do
  student = Student.create(
    first_name: 'Ajay',
    middle_name: 'Singh',
    last_name: 'Chouhan'
  )
  
  10.times do |i|
    student = Student.create(
      first_name: "student#{i+1}",
      middle_name: "Mstudent#{i+1}",
      last_name: "Lstudent#{i+1}"
    )
  end
  
  5.times do |i|
    syllabus = Syllabus.create(
      title: "DummySyllabus#{i+1}",
      description: "Some dummy syllabus#{i+1}",
    )
  end
  
  5.times do |i|
    blog = Blog.create(
      title: "TestBlog#{i+1}",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.#{i+1}",
    )
  end
  
  10.times do |i|
    student = Student.create(
      first_name: Faker::Name.first_name,
      middle_name: Faker::Name.middle_name,
      last_name: Faker::Name.last_name,
      email: Faker::Internet.email,
      date_of_birth: (Date.today + rand(1..30).days) - rand(24..36).years,
      address: Faker::Address.full_address,
    )
    puts "Student #{i+1} created successfully."
  end
end