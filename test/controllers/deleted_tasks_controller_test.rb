require 'test_helper'

class DeletedTasksControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get deleted_tasks_index_url
    assert_response :success
  end

  test "should get destroy" do
    get deleted_tasks_destroy_url
    assert_response :success
  end

  test "should get recover" do
    get deleted_tasks_recover_url
    assert_response :success
  end

end
