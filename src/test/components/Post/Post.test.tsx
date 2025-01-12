import { fireEvent, render, screen } from "@testing-library/react";

import Post from "../../../components/Post";
import { PostItem } from "../../../types/post";
import { usePost } from "../../../hooks/usePost";

const mockPost: PostItem = {
  author: "John Doe",
  story_title: "Story Title",
  title: "Post Title",
  story_url: "https://example.com/story",
  url: "https://example.com/post",
  story_id: 1,
  created_at: "2023-01-01T00:00:00.000Z",
  created_ai_i: 1,
  num_comments: 0,
  points: 1,
  objectID: "1",
};

vi.mock("../../../assets/heart-fill.svg", () => ({
  default: "heart-fill.svg",
}));

vi.mock("../../../assets/heart.svg", () => ({
  default: "heart.svg",
}));

// Mock usePost
vi.mock("../../../hooks/usePost");

describe("Post", () => {
  const mockUsePost = vi.mocked(usePost);

  beforeEach(() => {
    mockUsePost.mockReturnValue({
      favorites: [],
      handleFavorite: vi.fn(),
    });
  });

  it("renders the post title correctly", () => {
    render(<Post post={mockPost} />);

    if (mockPost.story_title) {
      expect(screen.getByText(mockPost.story_title)).toBeInTheDocument();
    } else {
      expect(screen.getByText(mockPost.title as string)).toBeInTheDocument();
    }
  });

  it("calls handleFavorite when the heart button is clicked", () => {
    render(<Post post={mockPost} />);
    const heartButton = screen.getByRole("button");
    expect(heartButton).toBeInTheDocument();

    fireEvent.click(heartButton);

    expect(mockUsePost().handleFavorite).toHaveBeenCalledWith(mockPost);

    expect(mockUsePost().handleFavorite).toHaveBeenCalledTimes(1);
  });

  it("renders the heart fill icon when the post is favorited", () => {
    mockUsePost.mockReturnValueOnce({
      favorites: [mockPost],
      handleFavorite: vi.fn(),
    });

    render(<Post post={mockPost} />);

    const heartIcon = screen.getByRole("img", { name: /Heart icon/i });

    expect(heartIcon).toHaveAttribute("src", "heart-fill.svg");
  });

  it("renders the heart icon when the post is not favorited", () => {
    render(<Post post={mockPost} />);

    const heartIcon = screen.getByRole("img", { name: /Heart icon/i });

    expect(heartIcon).toHaveAttribute("src", "heart.svg");
  });

  it("should redirect to the correct URL when clicking on the anchor tag", () => {
    render(<Post post={mockPost} />);

    const anchorTag = screen.getByRole("link");

    expect(anchorTag).toHaveAttribute("href", mockPost.story_url);
  });

  it("should matches the snapshot", () => {
    const { container } = render(<Post post={mockPost} />);
    expect(container).toMatchSnapshot();
  });
});
